"use server";

import { connectToDatabase } from "../mongodb";
import { Event } from "@/database";

export default async function getSimilarEventsBySlug(slug: string) {
  try {
    // Connect to DB
    await connectToDatabase();

    // 1. Find the original event
    const event = await Event.findOne({ slug }).lean();
    if (!event) return [];

    // 2. Get up to 3 similar events by shared tags
    const similarEvents = await Event.find({
      tags: { $in: event.tags || [] },
      slug: { $ne: slug },
    })
      .limit(3)
      .lean();
    console.log("Similar Events:", similarEvents);
    return similarEvents;
  } catch (error) {
    console.error("Error fetching similar events:", error);
    return [];
  }
}
