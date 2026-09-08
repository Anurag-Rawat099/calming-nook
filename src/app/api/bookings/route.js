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

    const {
      guestName,
      email,
      phone,
      roomType,
      checkIn,
      checkOut,
      adults,
      children,
      totalAmount,
      specialRequest,
    } = body;

    if (
      !guestName ||
      !email ||
      !phone ||
      !roomType ||
      !checkIn ||
      !checkOut
    ) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      guestName,
      email,
      phone,
      roomType,
      checkIn,
      checkOut,
      adults,
      children,
      totalAmount,
      specialRequest,
    });

    return Response.json(
      {
        success: true,
        message: "Booking created successfully.",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}