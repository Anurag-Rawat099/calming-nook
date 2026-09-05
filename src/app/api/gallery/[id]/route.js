import connectDB from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { requireAuth } from "@/lib/auth";

// UPDATE IMAGE
export async function PUT(request, { params }) {
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

    const updatedImage =
      await Gallery.findByIdAndUpdate(
        params.id,
        body,
        { new: true }
      );

    if (!updatedImage) {
      return Response.json(
        {
          success: false,
          message: "Image not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Gallery updated successfully.",
      image: updatedImage,
    });
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

// DELETE IMAGE
export async function DELETE(request, { params }) {
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

    const image = await Gallery.findByIdAndDelete(
      params.id
    );

    if (!image) {
      return Response.json(
        {
          success: false,
          message: "Image not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Gallery image deleted successfully.",
    });
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