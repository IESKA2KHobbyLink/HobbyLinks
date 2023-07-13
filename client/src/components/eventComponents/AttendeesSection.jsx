import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
function AttendeesSection({ eventId, attendees }) {
  return (
    <div className="mx-auto mt-5 max-w-4xl w-full">
      <h1 className="text-3xl font-bold pb-4">Attendees List</h1>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
        {attendees.map((attendee) => (
          <UserCard
            key={attendee.user_id}
            name={attendee.user_name}
            email={attendee.email}
            img={`http://localhost:8000${attendee.profile_pic}`}
          />
        ))}
      </div>
    </div>
  );
}

function UserCard({ name, email, img }) {
  const nameSplit = name.split(" ");
  const placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`; // create dynamic avatar
  return (
    <div className="px-2 py-4 border rounded-md flex gap-2 max-w-sm">
      <img
        className="w-16 h-16 rounded-full border-4 border-slate-50 object-cover"
        src={img == "http://localhost:8000null" ? placeHolderImg : img}
      />
      <div>
        <h1 className="text-lg font-bold ">{name}</h1>
        <p className="text-sm font-normal">{email}</p>
      </div>
    </div>
  );
}

function noData() {
  return (
    <div className="flex gap-1 justify-center items-center bg-slate-100 max-w-4xl w-full h-52 mt-2 border-slate-200 rounded-md">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faUserGroup} size="2xl" />
        <p className="font-thin">No Attendees</p>
      </div>
    </div>
  );
}
export default AttendeesSection;
