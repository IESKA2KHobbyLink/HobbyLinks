import React from 'react';
import { Link } from 'react-router-dom';

function JoinedEvent({eventDetails}) {
  //const membersCount = eventDetails.length;
  console.log(eventDetails);
  return (
    <div className='px-44 grid md:grid-cols-2'>
      {eventDetails.map((eventDetail) => (
        <EventDetails
          key={eventDetail.event_id}
          eventId={eventDetail.event_id}
          name={eventDetail.event_name}
          date={eventDetail.date}
          //membersCount={membersCount}
          desc={eventDetail.desc}
          imgPath={`http://localhost:8000${eventDetail.header_path}`}
        />
      ))}
    </div>
  );


};

function EventDetails ({ eventId, name, date, desc, membersCount, imgPath }) {
  return (
    <Link to={`/event/${eventId}`} className="flex w-11/12 bg-white md:flex-row mb-1 h-24 mt-8 border-2">
      <img src={imgPath} alt="" className="w-24 rounded-md" />
      <div className="flex flex-col justify-start px-4">
        <h5 className="text-md font-medium text-neutral-800 ">{name}</h5>
        <h2 className="text-sm font-semibold text-amber-500">{date}</h2>
        <p className="text-sm text-neutral-600">{desc}</p>
        <p className="mb-2 text-sm text-neutral-400 text-right">20 Attendees</p>
      </div>
    </Link>
  );
};

export default JoinedEvent;