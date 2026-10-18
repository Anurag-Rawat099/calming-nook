
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
  try {
    const auth = await requireAuth(request);

    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status }
      );
    }

    await connectDB();

    // Read payments from existing bookings.
    const bookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .lean();

    const payments = bookings.map((booking) => ({
      _id: booking._id.toString(),
      booking: booking._id.toString(),
      bookingId: booking.bookingId,
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      amount: Number(booking.totalAmount || 0),
      paymentMethod: booking.paymentMethod || "other",
      paymentStatus: booking.paymentStatus || "pending",
      transactionId: "",
      note: "",
      paidAt: null,
      createdAt: booking.createdAt,
    }));

    const totalRevenue = payments
      .filter((payment) => payment.paymentStatus === "paid")
      .reduce((total, payment) => total + payment.amount, 0);

    const pendingAmount = payments
      .filter((payment) =>
        ["pending", "partially_paid"].includes(payment.paymentStatus)
      )
      .reduce((total, payment) => total + payment.amount, 0);

    const refundedAmount = payments
      .filter((payment) => payment.paymentStatus === "refunded")
      .reduce((total, payment) => total + payment.amount, 0);

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
    console.error("Get payments error:", error);

    return Response.json(
      { success: false, message: "Failed to fetch payments." },
      { status: 500 }
    );
  }
}
