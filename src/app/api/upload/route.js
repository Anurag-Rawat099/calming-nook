import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAuth } from "@/lib/auth";

export async function POST(request) {
  try {
    const auth = await requireAuth(request);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        { status: auth.status }
      );
    }

    const formData = await request.formData();

    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No image uploaded.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "calming-nook/gallery",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({
      success: true,
      image: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed.",
      },
      { status: 500 }
    );
  }
}