import React from "react";
import { EventsArray } from "@/app/common/constants";
import Image from "next/image";
import { Color } from "ogl";
import BookEvent from "@/components/BookEvent";
import { get } from "node:http";
import getSimilarEventsBySlug from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const bookings = 50; // Example available bookings
const availableSeats = 150; // Example total seats
const EventDetails = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="event-detail-item flex items-center gap-2 my-2">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  );
};

const AgandaItem = ({ agandaItems }: { agandaItems: string[] }) => {
  return (
    <div className="agenda-item flex flex-col items-start gap-4 my-2 agenda">
      <h2>Agenda</h2>

      <ul className="flex flex-col gap-2 list-disc list-inside">
        {agandaItems.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="event-tags flex flex-wrap gap-2 my-2">
      {tags.map((tag: string, index: number) => (
        <span
          key={index}
          className="tag bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm m-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
const EventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const similarEvents: any = await getSimilarEventsBySlug(slug);

  const response = await fetch(`${BASE_URL}/api/events?slug=${slug}`, {
    cache: "no-store",
  }).then((response) => {
    // console.log("response", response);
    return response;
  });
  /* 
  if (!response.ok) {
    return <div>Event not found.</div>;
  } */

  const event: any = await response.json();
  const {
    title,
    time,
    location,
    description,
    date,
    mode,
    image,
    audience,
    agenda,
    organizer,
    tags,
  } = event.events[0];
  //   event: { title, description, date },
  // } = events[0];

  return (
    <div>
      <section id="event">
        <div className="header">
          <h1>Event Details</h1>
          <h2>{title}</h2>
          <p className="mt-2">{description}</p>
          EventPage - {slug}
        </div>
        <div className="details">
          {}
          <div className="contnt">
            <Image src={image} alt={title} width={800} height={800} />
            <section className="flex-col-gap-2 my-4">
              <h2>Overview</h2>
              <p>{description}</p>
            </section>
            <section className="flex-col-gap-2 my-4">
              <h2>Event Information</h2>
              <EventDetails
                alt="calender"
                icon="/icons/calendar.svg"
                label={date || ""}
              />
              <EventDetails
                alt="location"
                icon="/icons/pin.svg"
                label={location || ""}
              />
              <EventDetails
                alt="time"
                icon="/icons/clock.svg"
                label={time || ""}
              />
              <EventDetails
                alt="time"
                icon="/icons/mode.svg"
                label={mode || ""}
              />
            </section>
            <section className="flex-col-gap-2 my-4">
              <div>
                {agenda && (
                  <AgandaItem
                    agandaItems={agenda} // <-- FIX
                  />
                )}
              </div>
            </section>
            <section className="flex-col-gap-2 my-4">
              <h2>Organisers</h2>
              <p className="text-lg font-semibold">{organizer}</p>
            </section>
            <section className="flex-col-gap-2 my-4">
              <h2>Tags</h2>
              {tags && <EventTags tags={tags} />}
            </section>

            <section className="flex-col-gap-2 my-4">
              <h2>Additional Details</h2>
              <p className="text-lg font-semibold">Date: {date}</p>
              <p className="text-lg font-semibold">Mode: {mode}</p>
              <p className="text-lg font-semibold">Audience: {audience}</p>
              <p className="text-lg font-semibold">Tags: {tags?.join(", ")}</p>
            </section>
          </div>
          <aside className="booking">
            <div className="booking-header signup-card">
              <h2>Book Your Spot</h2>
              <p>Don't miss out on this exciting event!</p>
              {bookings > 0 && (
                <div className="text-xs">
                  <p className="text-xs">
                    Booked Seats:
                    <span
                      style={{ color: "red" }}
                      className="font-bold text-red-500 py-1 px-2 mr-1.5 text-xs"
                    >
                      {" "}
                      {bookings}
                    </span>
                    <span className="mx-1">|</span>
                    <span className=" py-1 px-2 mr-0.5 text-xs">
                      {" "}
                      Available Seats:{" "}
                    </span>
                    <span style={{ color: "green" }} className="font-bold ">
                      {availableSeats - bookings}{" "}
                    </span>
                  </p>
                  <BookEvent />
                </div>
              )}
            </div>
            <p className="text-lg font-semibold">bookeventDate: {date}</p>
          </aside>
        </div>
      </section>
      <div className="similar-events my-8 mx-auto w-[90%]">
        <h2 className="heading pb-4">Similar Events</h2>
        {similarEvents.length === 0 ? (
          <p>No similar events found.</p>
        ) : (
          <ul className="events list-none w-[98%] ">
            {similarEvents.map((event: any) => (
              <li className="list-none" key={event.title}>
                {" "}
                <EventCard key={event.title} {...event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventPage;
