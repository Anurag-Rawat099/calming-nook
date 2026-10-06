import connectDB from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Room from "@/models/Room";

export async function GET() {
  try {
    await connectDB();

    const rooms = await Room.find().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      rooms,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
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

    const body = await request.json();

    const slug = body.name.toLowerCase().replace(/\s+/g, "-");

    const room = await Room.create({
      ...body,
      slug,
    });

    return Response.json({
      success: true,
      room,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
