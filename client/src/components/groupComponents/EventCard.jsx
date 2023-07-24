import React from 'react';
import { Link } from 'react-router-dom';


function EventCard({name, date, imgPath, id}) {
  return (
    <Link to={`/event/${id}`} className="relative flex w-48 h-48 m-5 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className=" h-32 mb-3 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        <img src={imgPath} alt="img-blur-shadow" className='h-full w-full'/>
      </div>
      <div className="p-2">
        <h5 className="mb-2 block font-sans text-base font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
        {name}
        </h5>
        <p className="text-sm font-semibold text-amber-500">{date}</p>
      </div>
    </Link>
  );
}

export default EventCard;