import connectDB from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Room from "@/models/Room";


export async function GET(request, { params }) {
  try {
    await connectDB();

    const room = await Room.findById(params.id);

    if (!room) {
      return Response.json(
        {
          success: false,
          message: "Room not found.",
        },
        { status: 404 }
      );
    }

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
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
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

  const room = await Room.findByIdAndUpdate(params.id, body, { new: true });

  return Response.json({
    success: true,
    room,
  });
}

export async function DELETE(request, { params }) {
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

  await Room.findByIdAndDelete(params.id);

  return Response.json({
    success: true,
    message: "Room deleted successfully.",
  });
}
