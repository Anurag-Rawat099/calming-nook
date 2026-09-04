import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST() {
    try {
        await connectDB();

        const existingAdmin = await Admin.findOne({
            email: "admin@calmingnook.com",
        });

        if (existingAdmin) {
            return Response.json(
                {
                    success: false,
                    message: "Admin already exists.",
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(
            "Admin@12345",
            10
        );

        const admin = await Admin.create({
            name: "Calming Nook Admin",
            email: "admin@calmingnook.com",
            password: hashedPassword,
            role: "superadmin",
            isActive: true,
        });

        return Response.json({
            success: true,
            message: "Admin created successfully.",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("Setup admin error:", error);

        return Response.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}