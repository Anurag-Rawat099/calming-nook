import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/jwt";

export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        const email = body.email?.toLowerCase().trim();
        const password = body.password;

        // Validate input
        if (!email || !password) {
            return Response.json(
                {
                    success: false,
                    message: "Email and password are required.",
                },
                { status: 400 }
            );
        }

        // Find admin
        const admin = await Admin.findOne({
            email,
        });

        if (!admin) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid credentials.",
                },
                { status: 401 }
            );
        }

        // Check account status
        if (!admin.isActive) {
            return Response.json(
                {
                    success: false,
                    message: "Your admin account is inactive.",
                },
                { status: 403 }
            );
        }

        // Compare password with bcrypt hash
        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordValid) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid credentials.",
                },
                { status: 401 }
            );
        }

        // Create JWT
        const token = createToken({
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
        });

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Create response
        const response = Response.json({
            success: true,
            message: "Login successful.",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });

        // Set HTTP-only cookie
        response.headers.set(
            "Set-Cookie",
            [
                `token=${token}`,
                "HttpOnly",
                "Path=/",
                "Max-Age=604800",
                "SameSite=Strict",
                process.env.NODE_ENV === "production"
                    ? "Secure"
                    : "",
            ]
                .filter(Boolean)
                .join("; ")
        );

        return response;
    } catch (error) {
        console.error("Login error:", error);

        return Response.json(
            {
                success: false,
                message: "Something went wrong during login.",
            },
            { status: 500 }
        );
    }
}