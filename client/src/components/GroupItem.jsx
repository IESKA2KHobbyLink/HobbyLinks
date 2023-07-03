import React from "react";
import { Link } from "react-router-dom";

function GroupItem({ imgUrl, title, desc, groupId, memberCount, prefecture }) {
  const imgPath = `http://localhost:8000${imgUrl}`;

  return (
    <Link
      to={`/group/${groupId}`}
      className="flex flex-col rounded-lg bg-white shadow-md  md:flex-row border-b-2 mb-1 cursor-pointer p-1 h-36"
    >
      <img src={imgPath} alt="" className="w-52 rounded-md" />
      <div className="flex flex-col justify-start pt-2 px-4">
        <h5 className="mb-1 text-xl font-medium text-neutral-800 ">{title}</h5>
        <h2 className="text-md font-semibold text-amber-500">{prefecture}</h2>
        <p className="text-md text-neutral-600 overflow-hidden overflow-ellipsis">
          {desc}
        </p>
        <p className=" text-sm text-neutral-400 text-left">
          {memberCount} Members
        </p>
      </div>
    </Link>
  );
}

export default GroupItem;
