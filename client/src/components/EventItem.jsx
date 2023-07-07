import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function EventItem({
  imgUrl,
  title,
  desc,
  eventId,
  date,
  attendeeCount,
  group_name,
  type,
}) {
  const imgPath = `http://localhost:8000${imgUrl}`;
  useEffect(() => {}, []);
  return (
    <Link
      to={`/event/${eventId}`}
      className="flex flex-col rounded-lg bg-white shadow-md  md:flex-row border-b-2 mb-1 cursor-pointer p-1 h-44 max-w-4xl w-f"
    >
      <img src={imgPath} alt="" className="w-52 rounded-md" />
      <div className="flex flex-col justify-start pt-2 px-4">
        <h2 className="text-md font-semibold text-amber-500">{date}</h2>
        <h5 className="mb-1 text-xl font-medium text-neutral-800 ">{title}</h5>
        <p className="text-base text-neutral-600">
          {desc} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Obcaecati enim quidem cumque, recusandae repellat ipsa iusto commodi
        </p>

        <p className="text-md text-neutral-400 font-semibold text-left">
          {group_name}
        </p>

        <div className="flex gap-2">
          <p className="mb-2 text-sm text-neutral-400 text-left">
            {attendeeCount} Attendees
          </p>
          <p className="mb-2 text-sm text-neutral-400 text-left">{type}</p>
        </div>
      </div>
    </Link>
  );
}

export default EventItem;
