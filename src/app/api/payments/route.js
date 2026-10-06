import connectDB from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
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

        const payments = await Payment.find()
            .populate("booking")
            .sort({ createdAt: -1 });

        const totalRevenue = payments
            .filter(
                (payment) =>
                    payment.paymentStatus === "paid" ||
                    payment.paymentStatus === "partially_paid"
            )
            .reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        const pendingAmount = payments
            .filter(
                (payment) =>
                    payment.paymentStatus === "pending"
            )
            .reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        const refundedAmount = payments
            .filter(
                (payment) =>
                    payment.paymentStatus === "refunded"
            )
            .reduce(
                (total, payment) =>
                    total + payment.amount,
                0
            );

        return Response.json({
            success: true,
            payments,
            stats: {
                totalPayments: payments.length,
                totalRevenue,
                pendingAmount,
                refundedAmount,
            },
        });
    } catch (error) {
        console.error(
            "Get payments error:",
            error
        );

        return Response.json(
            {
                success: false,
                message: "Failed to fetch payments.",
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
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

        const {
            booking,
            bookingId,
            guestName,
            guestEmail,
            amount,
            paymentMethod,
            transactionId,
            paymentStatus,
            note,
        } = body;

        if (
            !booking ||
            !bookingId ||
            !guestName ||
            !guestEmail ||
            amount === undefined
        ) {
            return Response.json(
                {
                    success: false,
                    message:
                        "Booking, booking ID, guest details and amount are required.",
                },
                { status: 400 }
            );
        }

        const payment = await Payment.create({
            booking,
            bookingId,
            guestName,
            guestEmail,
            amount: Number(amount),
            paymentMethod:
                paymentMethod || "other",
            transactionId:
                transactionId || "",
            paymentStatus:
                paymentStatus || "pending",
            paidAt:
                paymentStatus === "paid"
                    ? new Date()
                    : null,
            note: note || "",
        });

        return Response.json(
            {
                success: true,
                message:
                    "Payment created successfully.",
                payment,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "Create payment error:",
            error
        );

        return Response.json(
            {
                success: false,
                message:
                    error.message ||
                    "Failed to create payment.",
            },
            { status: 500 }
        );
    }
}