import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUserGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function GroupHeader({
  imgUrl,
  title,
  groupId,
  user,
  prefecture,
  memberCount,
  created_by,
}) {
  const imgPath = `http://localhost:8000${imgUrl}`;
  return (
    <div className="flex justify-center mx-auto w-full ">
      <div className="pl-6">
        <img src={imgPath} alt="" className="max-w-xl " />
      </div>
      <div className="pl-10  max-w-sm w-full">
        <h1 className="text-3xl font-bold ">{title}</h1>

        <div className="mt-2">
          <div className="flex">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="pl-4 font-normal">{prefecture}</p>
          </div>
          <div className="flex ">
            <FontAwesomeIcon icon={faUserGroup} />
            <p className="pl-[9px] font-normal">{memberCount} Members</p>
          </div>
          <div className="flex ">
            <FontAwesomeIcon icon={faUser} />
            <p className="pl-[14px] font-normal">Created by : {created_by}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupHeader;
