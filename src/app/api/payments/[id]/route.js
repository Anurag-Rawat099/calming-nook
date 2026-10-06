import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { requireAuth } from "@/lib/auth";

export async function PUT(request, { params }) {
    try {
        const auth = await requireAuth(request);

        if (!auth.success) {
            return Response.json(
                {
                    success: false,
                    message: auth.message,
                },
                { status: auth.status }
            );
        }

        await connectDB();

        const body = await request.json();

        const payment = await Payment.findById(
            params.id
        );

        if (!payment) {
            return Response.json(
                {
                    success: false,
                    message: "Payment not found.",
                },
                { status: 404 }
            );
        }

        if (body.paymentStatus) {
            payment.paymentStatus =
                body.paymentStatus;

            if (
                body.paymentStatus === "paid"
            ) {
                payment.paidAt =
                    payment.paidAt ||
                    new Date();
            }

            if (
                body.paymentStatus !== "paid"
            ) {
                payment.paidAt = null;
            }
        }

        if (
            body.paymentMethod !== undefined
        ) {
            payment.paymentMethod =
                body.paymentMethod;
        }

        if (
            body.transactionId !== undefined
        ) {
            payment.transactionId =
                body.transactionId;
        }

        if (body.note !== undefined) {
            payment.note = body.note;
        }

        await payment.save();

        return Response.json({
            success: true,
            message:
                "Payment updated successfully.",
            payment,
        });
    } catch (error) {
        console.error(
            "Update payment error:",
            error
        );

        return Response.json(
            {
                success: false,
                message:
                    "Failed to update payment.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const auth = await requireAuth(request);

        if (!auth.success) {
            return Response.json(
                {
                    success: false,
                    message: auth.message,
                },
                { status: auth.status }
            );
        }

        await connectDB();

        const payment =
            await Payment.findByIdAndDelete(
                params.id
            );

        if (!payment) {
            return Response.json(
                {
                    success: false,
                    message: "Payment not found.",
                },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message:
                "Payment deleted successfully.",
        });
    } catch (error) {
        console.error(
            "Delete payment error:",
            error
        );

        return Response.json(
            {
                success: false,
                message:
                    "Failed to delete payment.",
            },
            { status: 500 }
        );
    }
}