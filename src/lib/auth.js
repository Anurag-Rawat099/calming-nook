import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyToken } from "@/lib/jwt";

export async function requireAuth(request) {
    try {
        await connectDB();

        const token = request.cookies.get("token")?.value;

        if (!token) {
            return {
                success: false,
                status: 401,
                message: "Not authenticated.",
            };
        }

        const decoded = await verifyToken(token);

        if (!decoded) {
            return {
                success: false,
                status: 401,
                message: "Session expired.",
            };
        }

        const admin = await Admin.findById(decoded.id).select(
            "-password"
        );

        if (!admin) {
            return {
                success: false,
                status: 401,
                message: "Admin not found.",
            };
        }

        if (!admin.isActive) {
            return {
                success: false,
                status: 403,
                message: "Admin account is inactive.",
            };
        }

        return {
            success: true,
            admin,
        };
    } catch (error) {
        console.error("Authentication error:", error);

        return {
            success: false,
            status: 500,
            message: "Authentication failed.",
        };
    }
}