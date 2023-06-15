import React from "react";

export default function EventHeader({ imgUrl, title }) {
  return (
    <div className='max-w-7xl'>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <img src={imgUrl} alt='' className='w-1/2' />
      </div>
    </div>
  );
}
