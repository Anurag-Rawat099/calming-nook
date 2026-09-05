import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { requireAuth } from "@/lib/auth";

// GET ALL IMAGES
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

    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to load gallery.",
      },
      { status: 500 }
    );
  }
}

// CREATE NEW IMAGE
export async function POST(request) {
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

    const body = await request.json();

    const {
      title,
      description,
      category,
      image,
      isFeatured,
    } = body;

    if (!title || !image?.url) {
      return Response.json(
        {
          success: false,
          message: "Title and Image are required.",
        },
        { status: 400 }
      );
    }

    const newImage = await Gallery.create({
      title,
      description,
      category,
      image,
      isFeatured,
    });

    return Response.json(
      {
        success: true,
        message: "Image added successfully.",
        image: newImage,
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