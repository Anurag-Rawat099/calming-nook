import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyToken } from "@/lib/jwt";

export async function GET(request) {
    try {
        await connectDB();

        const cookieHeader = request.headers.get("cookie");

        if (!cookieHeader) {
            return Response.json(
                {
                    success: false,
                    message: "Not authenticated.",
                },
                { status: 401 }
            );
        }

        const cookies = cookieHeader.split(";");

        const tokenCookie = cookies.find((cookie) =>
            cookie.trim().startsWith("token=")
        );

        if (!tokenCookie) {
            return Response.json(
                {
                    success: false,
                    message: "Not authenticated.",
                },
                { status: 401 }
            );
        }

        const token = tokenCookie
            .trim()
            .substring("token=".length);

        const decoded = await verifyToken(token);

        if (!decoded) {
            return Response.json(
                {
                    success: false,
                    message: "Session expired.",
                },
                { status: 401 }
            );
        }

        const admin = await Admin.findById(decoded.id)
            .select("-password");

        if (!admin || !admin.isActive) {
            return Response.json(
                {
                    success: false,
                    message: "Admin not found.",
                },
                { status: 401 }
            );
        }

        return Response.json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                isActive: admin.isActive,
                lastLogin: admin.lastLogin,
            },
        });
    } catch (error) {
        console.error("Auth check error:", error);

        return Response.json(
            {
                success: false,
                message: "Authentication failed.",
            },
            { status: 500 }
        );
    }
}