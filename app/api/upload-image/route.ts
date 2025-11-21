import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export const runtime = "nodejs";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  try {
    // --- JSON request ---
    if (contentType.includes("application/json")) {
      const body = await request.json();
      return NextResponse.json(
        { message: "JSON received", data: body },
        { status: 200 }
      );
    }

    // --- Multipart FormData (file upload) ---
    if (contentType.startsWith("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("image") as File | null;

      if (!file) {
        return NextResponse.json(
          { message: "Missing 'image' file" },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "image",
                folder: "Home", // folder auto-created if not existing
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as UploadApiResponse);
              }
            )
            .end(buffer);
        }
      );

      return NextResponse.json(
        {
          message: "Image uploaded successfully",
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        },
        { status: 201 }
      );
    }

    // Unsupported type
    return NextResponse.json(
      { message: "Unsupported Content-Type" },
      { status: 415 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
