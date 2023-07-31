import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EventHeader({
  imgUrl,
  title,
  user,
  group_name,
  group_id,
  currentUser,
  eventId,
  attendees,
  setAttendees,
  owner,
}) {
  const imgPath = `http://localhost:8000${imgUrl}`;
  //fix owner res in backend
  const nameSplit = owner.split(" ");
  const placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`; // create dynamic avatar

  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  //handle Join state
  const [joined, setJoined] = useState(false);
  //check if current user is in group if true setJoined to true
  const currentUserInGroup = async () => {
    try {
      const res = await http.get(
        `http://localhost:8000/api/events/${eventId}/users`
      );
      const attendees = res.data;

      const currentUserExists = attendees.some(
        (attendee) => attendee.user_id === currentUser.data.user_id
      );
      console.log("Is current user in Event?", currentUserExists);
      setJoined(currentUserExists);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    currentUserInGroup();
  }, []);

  const [loading, setLoading] = useState(false);

  const handleJoinDelete = async () => {
    try {
      if (joined === true) {
        setLoading(true);
        // Send DELETE request to leave the group
        let formData = new FormData();
        formData.append("_method", "DELETE");
        formData.append("event_id", eventId);
        formData.append("group_id", group_id);
        formData.append("user_id", currentUser.data.user_id);
        const res = await http.post(
          `http://localhost:8000/api/events/${eventId}/users`,
          formData
        );
        console.log("Remove User from event", res);

        // Update the attendees state by removing the current user
        setAttendees((prevMembers) =>
          prevMembers.filter(
            (member) => member.user_id !== currentUser.data.user_id
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinPost = async () => {
    try {
      if (joined === false) {
        setLoading(true);
        let formData = new FormData();
        formData.append("event_id", eventId);
        formData.append("user_id", currentUser.data.user_id);
        formData.append("group_id", group_id);
        const res = await http.post(
          `http://localhost:8000/api/events/${eventId}/users`,
          formData
        );
        console.log("Add User to event", res);

        const newMember = res.data.usersData;
        console.log(newMember);
        // Update the attendees state by adding the new member
        setAttendees((prevMembers) => [...prevMembers, newMember]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEventBtn = async () => {
    if (joined) {
      await handleJoinDelete(); // Leave the group
    } else {
      await handleJoinPost(); // Join the group
    }
    // Toggle the joined state
    setJoined((prev) => !prev);
  };

  return (
    <div className="mx-auto">
      <div className="mt-2">
        <h1 className="text-md font-medium text-amber-600">{group_name}</h1>
        <h1 className="text-3xl font-medium">{title}</h1>
        <div className="flex justify-between my-2">
          <div>
            <div className=" py-2 flex gap-1 max-w-sm items-center">
              <img
                className="w-14 h-14 rounded-full border-4 border-slate-50 object-cover"
                src={
                  imgPath == "http://localhost:8000null"
                    ? placeHolderImg
                    : placeHolderImg
                }
              />
              <div>
                <p className=" text-md font-bold">Hosted by</p>
                <h2 className=" text-lg "> {owner}</h2>
              </div>
            </div>
          </div>

          <button
            className={` font-bold text-xl px-4 py-2 text-center h-12 ${
              joined
                ? "text-white bg-red-500 hover:bg-red-800 hover:border-red-600 border-red-400  border-b-4 rounded-lg"
                : "text-white bg-purple-500 hover:bg-purple-800 hover:border-purple-600 border-purple-400  border-b-4  rounded-lg"
            }`}
            onClick={handleJoinEventBtn}
          >
            {joined ? "Leave This Event" : "Join This Event"}
          </button>
        </div>
      </div>

      <div className="flex justify-center ">
        <img src={imgPath} alt="" className="max-w-4xl h-[400px] w-[890px]" />
      </div>
    </div>
  );
}
