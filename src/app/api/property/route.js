import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import { requireAuth } from "@/lib/auth";

// GET SETTINGS
export async function GET(request) {
  const auth = await requireAuth(request);

  if (!auth.success) {
    return Response.json(
      { success: false, message: auth.message },
      { status: auth.status }
    );
  }

  await connectDB();

  const property = await Property.findOne();

  return Response.json({
    success: true,
    property,
  });
}

// CREATE SETTINGS
export async function POST(request) {
  const auth = await requireAuth(request);

  if (!auth.success) {
    return Response.json(
      { success: false, message: auth.message },
      { status: auth.status }
    );
  }

  await connectDB();

  const existing = await Property.findOne();

  if (existing) {
    return Response.json(
      {
        success: false,
        message: "Settings already exist.",
      },
      { status: 409 }
    );
  }

  const body = await request.json();

  const property = await Property.create(body);

  return Response.json({
    success: true,
    property,
  });
}

// UPDATE SETTINGS
export async function PUT(request) {
  const auth = await requireAuth(request);

  if (!auth.success) {
    return Response.json(
      { success: false, message: auth.message },
      { status: auth.status }
    );
  }

  await connectDB();

  const body = await request.json();

  const property = await Property.findOne();

  if (!property) {
    return Response.json(
      {
        success: false,
        message: "Settings not found.",
      },
      { status: 404 }
    );
  }

  Object.assign(property, body);

  await property.save();

  return Response.json({
    success: true,
    property,
  });
}