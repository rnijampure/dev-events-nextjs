import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event, EventDocument } from "@/database/event.model";

// Ensure this route runs in the Node.js runtime.
export const runtime = "nodejs";

// Type for the dynamic route params provided by Next.js.
interface EventBySlugRouteParams {
  slug: string;
}

export async function GET(
  _request: NextRequest,
  context: { params: EventBySlugRouteParams }
): Promise<NextResponse> {
  try {
    const { slug } = context.params;

    // Basic validation to avoid querying with an empty or malformed slug.
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { message: "Missing or invalid 'slug' parameter." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find the event by its unique slug.
    const event: Event | null = await Event.findOne({ slug })
      .lean<Event>()
      .exec();

    if (!event) {
      return NextResponse.json(
        { message: `Event not found for slug '${slug}'.` },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    // In production, this log can be wired to an observability platform.
    console.error("Error fetching event by slug:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch event.",
        error:
          error instanceof Error
            ? error.message
            : String(error) || "Unknown error",
      },
      { status: 500 }
    );
  }
}
