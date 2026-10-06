import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
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
                { status: auth.status }
            );
        }

        await connectDB();

        const bookings = await Booking.find()
            .sort({ createdAt: -1 })
            .lean();

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
            { status: 500 }
        );
    }
}

// POST — Public: create booking
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

        // Required fields
        if (
            !name ||
            !email ||
            !phone ||
            !roomsNeeded ||
            !guests ||
            !checkin ||
            !checkout
        ) {
            return Response.json(
                {
                    success: false,
                    message: "Please fill all required booking fields.",
                },
                { status: 400 }
            );
        }

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
                { status: 400 }
            );
        }

        if (checkOutDate <= checkInDate) {
            return Response.json(
                {
                    success: false,
                    message: "Check-out date must be after check-in date.",
                },
                { status: 400 }
            );
        }

        const booking = await Booking.create({
            bookingId: generateBookingId(),

            guestName: name.trim(),

            guestEmail: email
                .trim()
                .toLowerCase(),

            guestPhone: phone.trim(),

            roomsNeeded: Number(roomsNeeded),

            guests: Number(guests),

            checkIn: checkInDate,

            checkOut: checkOutDate,

            totalAmount: 0,

            paymentStatus: "pending",

            paymentMethod: "other",

            bookingStatus: "pending",

            specialRequest: message?.trim() || "",

            adminNote: "",
        });

        return Response.json(
            {
                success: true,
                message: "Booking request submitted successfully.",
                booking: {
                    id: booking._id,
                    bookingId: booking.bookingId,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create booking error:", error);

        return Response.json(
            {
                success: false,
                message: "Failed to create booking.",
            },
            { status: 500 }
        );
    }
}