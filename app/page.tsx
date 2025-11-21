import EventCard from "@/components/EventCard";
import RoundedButton from "@/components/RoundedButton";
import React from "react";
import Image from "next/image";
import { events } from "../app/common/constants";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Home = async () => {
  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });
  const { events } = await response.json();

  console.log("Rendering Home Page");

  return (
    <>
      <h1 className="text-2xl text-center">
        Welcome to nextjs evnets hub!
        <br />
      </h1>
      <p className=" text-center text-yellow-100 pt-4 italic">
        {" "}
        Hacathons, events, and more! Explore various events and activities.
      </p>
      <RoundedButton />
      <div className="mt-20 space-y-7">
        <h1 className="heading text-center pb-4">Featured Events</h1>

        <ul className="events list-none">
          {events.map((event: any) => (
            <li className="list-none" key={event.title}>
              {" "}
              <EventCard key={event.title} {...event} />
            </li>
          ))}
          {/*      {[1, 2, 3, 4, 5].map((event: any) => (
            <li key={event.id}>{event}</li>
          ))} */}
        </ul>
        <hr></hr>
        <h2 className="text-2xl text-center pt-8 pb-4">Other Notable Events</h2>
        <ul className="events-list space-y-4 list-disc list-inside">
          <li>
            Hackathon 2024 - Join us for a weekend of coding and innovation.
          </li>
          <li>Tech Conference - Explore the latest trends in technology.</li>
          <li>
            Startup Pitch Night - Watch startups pitch their ideas to investors.
          </li>
          <li>
            Workshop Series - Enhance your skills with hands-on workshops.
          </li>
          <li>Networking Event - Connect with professionals in your field.</li>
        </ul>
        <p className="text-center text-sm text-gray-300" id="events">
          Crafted with ❤️ using Next.js and Tailwind CSS.
        </p>
      </div>
    </>
  );
};

export default Home;
