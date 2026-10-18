
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Property from "@/models/Property";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");

    if (!checkInParam || !checkOutParam) {
      return Response.json(
        {
          success: false,
          message: "Check-in and check-out required.",
        },
        { status: 400 }
      );
    }

    const checkIn = new Date(checkInParam);
    const checkOut = new Date(checkOutParam);

    if (
      Number.isNaN(checkIn.getTime()) ||
      Number.isNaN(checkOut.getTime()) ||
      checkOut <= checkIn
    ) {
      return Response.json(
        {
          success: false,
          message: "Please provide valid check-in and check-out dates.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const property = await Property.findOne().lean();

    if (
      !property ||
      !Number.isFinite(Number(property.totalRooms)) ||
      Number(property.totalRooms) < 1
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Property room inventory is not configured. Please check Website Settings.",
        },
        { status: 500 }
      );
    }

    const totalRooms = Number(property.totalRooms);

    // Only bookings whose stays overlap the requested dates.
    // Check-out on the requested check-in date does not overlap.
    const bookings = await Booking.find({
      bookingStatus: {
        $in: ["pending", "confirmed"],
      },
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    })
      .select("roomsNeeded")
      .lean();

    const bookedRooms = bookings.reduce(
      (sum, booking) =>
        sum + Math.max(0, Number(booking.roomsNeeded) || 0),
      0
    );

    const availableRooms = Math.max(
      0,
      totalRooms - bookedRooms
    );

    return Response.json({
      success: true,
      totalRooms,
      bookedRooms,
      availableRooms,
      isAvailable: availableRooms > 0,
    });
  } catch (error) {
    console.error("Availability API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to check availability.",
      },
      { status: 500 }
    );
  }
}
