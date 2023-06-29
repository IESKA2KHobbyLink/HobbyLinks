import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventHeader from "../components/eventComponents/EventHeader";
import EventDesc from "../components/eventComponents/EventDesc";
import AttendeesSection from "../components/eventComponents/AttendeesSection";
import axios from "axios";

function EventPage() {
  const { eventId } = useParams();

  const [eventDetails, setEventDetails] = useState({
    imgUrl: "",
    title: "",
    desc: "",
    address: "",
    type: "",
    date: "",
    prefecture: "",
    created_by: "",
    group_name: "",
    group_id: "",
    eventId: eventId,
  });

  const [user, setUser] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);

        setEventDetails({
          title: response.data.event_name,
          desc: response.data.desc,
          eventId: eventId,
          imgUrl: response.data.header_path,
          address: response.data.address,
          type: response.data.type,
          prefecture: response.data.prefecture,
          created_by: response.data.created_by,
          group_name: response.data.group_name,
          group_id: response.data.group_id,
          date: response.data.date,
        });
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };
    // for created by fix backend later
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${eventDetails.created_by}`
        );
        setUser(response.data.user_name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchEventsData();
    if (eventDetails.created_by) {
      fetchUser();
    }
  }, [eventId, eventDetails.created_by]);

  //fetch attendees
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${eventId}/users`);
        setAttendees(response.data);
      } catch (error) {
        console.error("Error fetching attendees:", error);
      }
    };

    fetchMembers();
  }, [eventId]);

  return (
    <>
      <div className=' min-h-screen bg-slate-50'>
        <div className='flex flex-col mb-2 mx-auto max-w-6xl w-full bg-white  py-5 shadow-lg min-h-screen'>
          <EventHeader
            imgUrl={eventDetails.imgUrl}
            title={eventDetails.title}
            group_name={eventDetails.group_name}
            group_id={eventDetails.group_id}
            currentUser={currentUser}
            eventId={eventId}
            user={user}
            attendees={attendees}
            setAttendees={setAttendees}
          />

          <EventDesc
            desc={eventDetails.desc}
            eventId={eventDetails.eventId}
            address={eventDetails.address}
            type={eventDetails.type}
            prefecture={eventDetails.prefecture}
            date={eventDetails.date}
          />

          <AttendeesSection eventId={eventId} attendees={attendees} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}

export default EventPage;
