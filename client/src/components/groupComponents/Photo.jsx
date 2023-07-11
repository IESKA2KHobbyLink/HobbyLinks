import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

function Photo() {
  return (
    <div className="mx-5">
      <h1 className="text-3xl font-bold">Photos</h1>
      <div className="flex gap-1 justify-center items-center bg-slate-100 max-w-4xl w-full h-52 mt-2 border-slate-200 rounded-md">
        <div className="flex flex-col items-center">
          <FontAwesomeIcon icon={faImage} size="2xl" />
          <p className="font-thin">No Photos Uploaded</p>
        </div>
      </div>
    </div>
  );
}

export default Photo;
