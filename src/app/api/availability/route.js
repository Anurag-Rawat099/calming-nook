import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Property from "@/models/Property";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!checkIn || !checkOut) {
      return Response.json(
        {
          success: false,
          message: "Check-in and check-out required.",
        },
        { status: 400 }
      );
    }

    const property = await Property.findOne();

    const totalRooms = property?.totalRooms || 8;

    // Active bookings overlapping selected dates
    const bookings = await Booking.find({
      status: {
        $in: ["Pending", "Confirmed"],
      },
      checkIn: {
        $lt: new Date(checkOut),
      },
      checkOut: {
        $gt: new Date(checkIn),
      },
    });

    const bookedRooms = bookings.reduce(
      (sum, booking) => sum + booking.roomsNeeded,
      0
    );

    const availableRooms = totalRooms - bookedRooms;

    return Response.json({
      success: true,
      totalRooms,
      bookedRooms,
      availableRooms,
      isAvailable: availableRooms > 0,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to check availability.",
      },
      { status: 500 }
    );
  }
}