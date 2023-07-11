import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faMapLocationDot,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

function EventDesc({ desc, date, type, address, prefecture }) {
  //handle Join event ptn

  return (
    <div className="mx-auto mt-10 max-w-4xl w-full">
      <div className="flex mb-2 align-middle gap-3">
        <FontAwesomeIcon icon={faCalendar} size="xl" />
        <h1 className=" text-xl">{date}</h1>
      </div>

      <div className="flex mb-2 align-middle gap-2">
        <FontAwesomeIcon icon={faMapLocationDot} size="xl" />
        <h2 className="text-xl">{address}</h2>
      </div>

      <div className="mt-5 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Descriptions</h1>
        <p className="font-normal mb-2">{desc}</p>
      </div>
    </div>
  );
}

export default EventDesc;
