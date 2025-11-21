import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const EventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const response = await fetch(`${BASE_URL}/api/events?slug=${slug}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return <div>Event not found.</div>;
  }

  const { event } = await response.json();
  console.log("Fetched events data:", event);

  return (
    <div>
      <section id="event-details">EventPage - {event.slug}</section>
    </div>
  );
};

export default EventPage;
