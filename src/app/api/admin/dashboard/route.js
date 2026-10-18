
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { requireAuth } from "@/lib/auth";

export async function GET(request) {
  try {
    // Protect dashboard statistics
    const auth = await requireAuth(request);

    if (!auth.success) {
      return Response.json(
        {
          success: false,
          message: auth.message || "Not authenticated.",
        },
        { status: auth.status || 401 }
      );
    }

    await connectDB();

    // Count all bookings
    const totalBookings = await Booking.countDocuments();

    // Count bookings awaiting confirmation
    const pendingBookings = await Booking.countDocuments({
      bookingStatus: "pending",
    });

    // Calculate revenue from paid bookings only
    const revenueResult = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    // Fetch the five most recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "bookingId guestName checkIn checkOut bookingStatus paymentStatus totalAmount createdAt"
      )
      .lean();

    return Response.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        totalRevenue,
      },
      recentBookings,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to load dashboard statistics.",
      },
      { status: 500 }
    );
  }
}
