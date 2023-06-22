import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUserGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function GroupHeader({ imgUrl, title, groupId }) {
  return (
    <div className="flex justify-center mx-auto w-full ">
      <div>
        <img src="" alt="" className="max-w-2xl h-[400px]" />
      </div>
      <div className="pl-6  max-w-sm w-full">
        <h1 className="text-3xl font-bold ">{title}</h1>

        <div className="mt-2">
          <div className="flex">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="pl-4 font-normal">Osaka,Jp</p>
          </div>
          <div className="flex ">
            <FontAwesomeIcon icon={faUserGroup} />
            <p className="pl-[9px] font-normal">20 Members</p>
          </div>
          <div className="flex ">
            <FontAwesomeIcon icon={faUser} />
            <p className="pl-[14px] font-normal">Created by : User_01</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupHeader;
