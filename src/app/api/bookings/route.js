import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { requireAuth } from "@/lib/auth";

// ================= GET ALL BOOKINGS =================

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

    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch bookings.",
      },
      { status: 500 }
    );
  }
}

// ================= CREATE BOOKING =================

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const booking = await Booking.create({
      guestName: body.guestName,
      email: body.email,
      phone: body.phone,

      roomsNeeded: body.roomsNeeded,

      checkIn: body.checkIn,
      checkOut: body.checkOut,

      adults: body.adults,
      children: body.children || 0,

      totalAmount: body.totalAmount,

      specialRequest: body.specialRequest,
    });

    return Response.json({
      success: true,
      booking,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}