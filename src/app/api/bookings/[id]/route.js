import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";

// GET SINGLE BOOKING
export async function GET(request, { params }) {
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

    await connectDB();

    const booking = await Booking.findById(id);

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return Response.json({ success: true, booking });
  } catch (error) {
    console.error("Fetch booking error:", error);

    return Response.json(
      { success: false, message: "Failed to fetch booking." },
      { status: 500 }
    );
  }
}

// UPDATE BOOKING STATUS
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

    // Only allow updating booking status through this endpoint.
    const status = (body.bookingStatus ?? body.status)?.toLowerCase();

    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return Response.json(
        { success: false, message: "Invalid booking status." },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findByIdAndUpdate(
      id,
      { $set: { bookingStatus: status } },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Booking status updated successfully.",
      booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);

    return Response.json(
      { success: false, message: "Failed to update booking." },
      { status: 500 }
    );
  }
}

// DELETE BOOKING
export async function DELETE(request, { params }) {
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

    await connectDB();

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Delete booking error:", error);

    return Response.json(
      { success: false, message: "Failed to delete booking." },
      { status: 500 }
    );
  }
}