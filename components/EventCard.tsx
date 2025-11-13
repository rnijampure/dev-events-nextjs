import Link from "next/link";
import React from "react";
import Image from "next/image";
import { EventCardProps } from "../app/common/constants";

const EventCard = ({
  image,
  title,
  location,
  date,
  description,
  time,
}: EventCardProps) => {
  return (
    <>
      <div className="event-card">
        <p className="title text-2xl pb-2">{title}</p>
        <Link href={`/events/${title}`} id="event-card">
          <Image
            src={image}
            alt={title}
            width={410}
            height={300}
            className="poster"
          />
          <div className="flex flex-row gap-2">
            <Image
              src="/icons/pin.svg"
              alt="Location Icon"
              width={14}
              height={14}
            />
            <p>{location}</p>
          </div>
          <p className="title">{title}</p>
          <div className="datetime">
            <div>
              <Image
                src="/icons/calendar.svg"
                alt="Calender Icon"
                width={14}
                height={14}
              />
              <p>
                {date} &nbsp; {time}
              </p>
            </div>
          </div>
        </Link>
        <p className="title"></p>
      </div>
    </>
  );
};

export default EventCard;
