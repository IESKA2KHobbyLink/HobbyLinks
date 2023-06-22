import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function EventHeader({ imgUrl, title }) {
  return (
    <div className="mx-auto">
      <div className="mt-2">
        <h1 className="text-3xl font-medium">{title}</h1>
        <div className="flex gap-2 my-4">
          <FontAwesomeIcon icon={faUser} size="xl" li />
          <h2 className="">Created by: User_01</h2>
        </div>
      </div>

      <div className="flex justify-center ">
        <img src={imgUrl} alt="" className="max-w-4xl h-[400px] w-[896px]" />
      </div>
    </div>
  );
}
