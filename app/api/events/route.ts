import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

import { Event } from "@/database/event.model";

type CreateEventPayload = {
  title: string;
  description: string;
  overview: string;
  image?: string; // optional if sending JSON without file
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});
// using raw JSON payload instead of formData to fix image upload issue
/* 
export async function POST(request: NextRequest) {

  try {
    await connectToDatabase();

    // ⬇️ FIX: Parse JSON, not formData
    const eventObj = await request.json();

    const createdEvent = await Event.create(eventObj);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
} */

// Using formData to handle image upload to Cloudinary
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const eventObj = Object.fromEntries(formData.entries());
    const formDataImage = formData.get("image") as File | null;
    if (!formDataImage) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }
    const imageBuffer = await formDataImage.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader
          .upload_stream(
            {
              folder: "events",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result!);
            }
          )
          .end(buffer);
      }
    );
    eventObj.image = uploadResult.secure_url;

    const createdEvent = await Event.create(eventObj);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find().sort({ createAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
