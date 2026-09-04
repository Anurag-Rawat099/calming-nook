import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST() {
    try {
        await connectDB();

        const email = "admin@calmingnook.com";
        const newPassword = "Admin@12345";

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return Response.json(
                {
                    success: false,
                    message: "Admin not found.",
                },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        admin.password = hashedPassword;
        admin.isActive = true;

        await admin.save();

        return Response.json({
            success: true,
            message: "Admin password updated successfully.",
        });
    } catch (error) {
        console.error("Reset admin error:", error);

        return Response.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 }
        );
    }
}