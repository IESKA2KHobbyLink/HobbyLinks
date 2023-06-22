import React from "react";
import { Link } from "react-router-dom";

function EventItem({ imgUrl, title, desc, eventId }) {
  let todayDate = new Date().toISOString().slice(0, 10);

  return (
    <Link
      to={`/event/${eventId}`}
      className="flex flex-col rounded-lg bg-white shadow-md md:flex-row border-b-2 mb-1 cursor-pointer"
    >
      <img src={imgUrl} alt="" className="w-52 rounded-md" />
      <div className="flex flex-col justify-start pt-2 px-4">
        <h2 className="text-md font-semibold text-amber-500">{todayDate}</h2>
        <h5 className="mb-1 text-xl font-medium text-neutral-800 ">{title}</h5>
        <p className="text-base text-neutral-600">{desc}</p>
        <p className="mb-2 text-sm text-neutral-400 text-right">20 Attendees</p>
      </div>
    </Link>
  );
}

export default EventItem;
