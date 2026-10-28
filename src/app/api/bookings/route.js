import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import { requireAuth } from "@/lib/auth";

function generateBookingId() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(100 + Math.random() * 900);

  return `CN-${timestamp}-${random}`;
}

// GET — Admin: fetch all bookings
export async function GET(request) {
  try {
    const auth = await requireAuth(request);

    if (!auth.success) {
      return Response.json(
        {
          success: false,
          message: auth.message,
        },
        { status: auth.status },
      );
    }

    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

    return Response.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch bookings.",
      },
      { status: 500 },
    );
  }
}

// POST — Public: create booking after checking availability
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      email,
      phone,
      roomsNeeded,
      guests,
      checkin,
      checkout,
      message,
    } = body;

    // STEP 1: Validate required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      roomsNeeded === undefined ||
      roomsNeeded === null ||
      roomsNeeded === "" ||
      guests === undefined ||
      guests === null ||
      guests === "" ||
      !checkin ||
      !checkout
    ) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required booking fields.",
        },
        { status: 400 },
      );
    }

    // STEP 2: Validate room and guest counts
    const requestedRooms = Number(roomsNeeded);
    const requestedGuests = Number(guests);

    if (!Number.isSafeInteger(requestedRooms) || requestedRooms < 1) {
      return Response.json(
        {
          success: false,
          message: "Please select a valid number of rooms.",
        },
        { status: 400 },
      );
    }

    if (!Number.isSafeInteger(requestedGuests) || requestedGuests < 1) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid number of guests.",
        },
        { status: 400 },
      );
    }

    // STEP 3: Validate check-in and check-out dates
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      return Response.json(
        {
          success: false,
          message: "Invalid check-in or check-out date.",
        },
        { status: 400 },
      );
    }

    if (checkOutDate <= checkInDate) {
      return Response.json(
        {
          success: false,
          message: "Check-out date must be after check-in date.",
        },
        { status: 400 },
      );
    }

    // STEP 4: Get total physical room inventory
    const roomInventory = await Room.find({
      available: true,
    })
      .select("totalRooms")
      .lean();

    const totalRooms = roomInventory.reduce((total, room) => {
      const count = Number(room.totalRooms);

      return total + (Number.isSafeInteger(count) && count > 0 ? count : 0);
    }, 0);

    if (totalRooms < 1) {
      return Response.json(
        {
          success: false,
          message: "No rooms are currently available for booking.",
          availableRooms: 0,
        },
        { status: 409 },
      );
    }

    // STEP 5: Find bookings overlapping the requested dates.
    // Pending and confirmed bookings both reserve rooms.
    // Cancelled and completed bookings do not reserve rooms.
    const overlappingBookings = await Booking.find({
      bookingStatus: {
        $in: ["pending", "confirmed"],
      },
      checkIn: {
        $lt: checkOutDate,
      },
      checkOut: {
        $gt: checkInDate,
      },
    })
      .select("roomsNeeded")
      .lean();

    // STEP 6: Calculate rooms already reserved
    const bookedRooms = overlappingBookings.reduce((total, booking) => {
      const count = Number(booking.roomsNeeded);

      return total + (Number.isSafeInteger(count) && count > 0 ? count : 0);
    }, 0);

    // STEP 7: Calculate available rooms
    const availableRooms = Math.max(0, totalRooms - bookedRooms);
     console.log("=== BOOKING AVAILABILITY DEBUG ===");
    console.log("Requested check-in:", checkInDate);
    console.log("Requested check-out:", checkOutDate);
    console.log("Requested rooms:", requestedRooms);
    console.log("Total rooms:", totalRooms);
    console.log("Overlapping bookings:", overlappingBookings);
    console.log("Booked rooms:", bookedRooms);
    console.log("Available rooms:", availableRooms);

    // STEP 8: Reject requests that exceed availability
    if (requestedRooms > availableRooms) {
      return Response.json(
        {
          success: false,
          message: `Only ${availableRooms} room(s) are available for your selected dates.`,
          availableRooms,
        },
        { status: 409 },
      );
    }
   

    // STEP 9: Create the booking only after availability passes
    const booking = await Booking.create({
      bookingId: generateBookingId(),

      guestName: name.trim(),
      guestEmail: email.trim().toLowerCase(),
      guestPhone: phone.trim(),

      roomsNeeded: requestedRooms,
      guests: requestedGuests,

      checkIn: checkInDate,
      checkOut: checkOutDate,

      totalAmount: 0,
      paymentStatus: "pending",
      paymentMethod: "other",
      bookingStatus: "pending",

      specialRequest: typeof message === "string" ? message.trim() : "",

      adminNote: "",
    });

    // STEP 10: Return booking confirmation
    return Response.json(
      {
        success: true,
        message: "Booking request submitted successfully.",
        booking: {
          id: booking._id,
          bookingId: booking.bookingId,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create booking error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create booking.",
      },
      { status: 500 },
    );
  }
}
