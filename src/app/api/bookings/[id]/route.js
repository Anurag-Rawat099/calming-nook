import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { requireAuth } from "@/lib/auth";

// ================= GET SINGLE BOOKING =================

export async function GET(request, { params }) {
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

    const booking = await Booking.findById(params.id);

    if (!booking) {
      return Response.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch booking.",
      },
      { status: 500 }
    );
  }
}

// ================= UPDATE BOOKING =================

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

    const booking = await Booking.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
      }
    );

    if (!booking) {
      return Response.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Booking updated successfully.",
      booking,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update booking.",
      },
      { status: 500 }
    );
  }
}

// ================= DELETE BOOKING =================

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

    const booking = await Booking.findByIdAndDelete(
      params.id
    );

    if (!booking) {
      return Response.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete booking.",
      },
      { status: 500 }
    );
  }
}   