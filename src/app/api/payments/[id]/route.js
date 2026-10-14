import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  try {
    const auth = await requireAuth(request);

    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status }
      );
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: "Invalid booking ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const paymentStatus = body.paymentStatus;

    // Only allow the payment actions currently available in the UI.
    if (!["paid", "refunded"].includes(paymentStatus)) {
      return Response.json(
        { success: false, message: "Invalid payment status." },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findById(id);

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    if (
      paymentStatus === "paid" &&
      booking.paymentStatus !== "pending"
    ) {
      return Response.json(
        {
          success: false,
          message: "Only pending payments can be marked as paid.",
        },
        { status: 400 }
      );
    }

    if (
      paymentStatus === "refunded" &&
      booking.paymentStatus !== "paid"
    ) {
      return Response.json(
        {
          success: false,
          message: "Only paid bookings can be marked as refunded.",
        },
        { status: 400 }
      );
    }

    booking.paymentStatus = paymentStatus;
    await booking.save();

    return Response.json({
      success: true,
      message: "Payment status updated successfully.",
    });
  } catch (error) {
    console.error("Update payment error:", error);

    return Response.json(
      { success: false, message: "Failed to update payment status." },
      { status: 500 }
    );
  }
}