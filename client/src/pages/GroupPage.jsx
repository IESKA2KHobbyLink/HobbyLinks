import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import GroupHeader from "../components/groupComponents/GroupHeader";
import About from "../components/groupComponents/About";
import EventsSection from "../components/groupComponents/EventsSection";
import MemberSection from "../components/groupComponents/MemberSection";
import Photo from "../components/groupComponents/Photo";
import axios from "axios";

function GroupPage() {
  const { groupId } = useParams();

  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  // Define the values in state
  const [groupDetails, setGroupDetails] = useState({
    imgUrl: "",
    title: "",
    desc: "",
    prefecture: "",
    groupId: groupId,
    created_by: "",
    memberCount: "",
  });

  const [eventDetails, setEventDetails] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/groups/${groupId}`
        );

        setGroupDetails({
          title: response.data.group_name,
          desc: response.data.desc,
          prefecture: response.data.prefecture,
          groupId: groupId,
          events: response.data.events,
          imgUrl: response.data.header_path,
          created_by: response.data.owner,
          memberCount: response.data.memberCount,
        });
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/groups/${groupId}/events`
        );

        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEvent();
  }, []);
  //console.log(eventDetails);

  //handle Join group btn
  const [joined, setJoined] = useState(false);

  //check if current user is in group if true setJoined to true
  const currentUserInGroup = async () => {
    try {
      const res = await http.get(
        `http://localhost:8000/api/groups/${groupId}/users`
      );
      const members = res.data;

      const currentUserExists = members.some(
        (member) => member.user_id === currentUser.data.user_id
      );
      //console.log("Is current user in group?", currentUserExists);
      setJoined(currentUserExists);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    currentUserInGroup();
  }, []);

  const handleJoinGroupBtn = async () => {
    if (joined) {
      await handleJoinDelete(); // Leave the group
    } else {
      await handleJoinPost(); // Join the group
    }
    // Toggle the joined state
    setJoined((prev) => !prev);
  };

  const handleJoinDelete = async () => {
    try {
      if (joined == true) {
        setLoading(true);
        // Send DELETE request to leave the group
        let formData = new FormData();
        formData.append("_method", "DELETE");
        formData.append("group_id", groupId);
        formData.append("user_id", currentUser.data.user_id);
        const res = await http.post(
          `http://localhost:8000/api/groups/${groupId}/users`,
          formData
        );
        console.log("Remove User to group", res);
        setMembers((prevMembers) =>
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
      if (joined == false) {
        setLoading(true);
        let formData = new FormData();
        formData.append("group_id", groupId);
        formData.append("user_id", currentUser.data.user_id);
        const res = await http.post(
          `http://localhost:8000/api/groups/${groupId}/users`,
          formData
        );
        console.log("Add User to group", res);
        const newMember = res.data.usersData;
        setMembers((prevMembers) => [...prevMembers, newMember]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  //fetch memeber
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/groups/${groupId}/users`
        );
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [groupId]);

  const [loading, setLoading] = useState(false);

  //smooth scroll ref
  const aboutRef = useRef(null);
  const membersRef = useRef(null);
  const eventsRef = useRef(null);
  const photoRef = useRef(null);

  const handleScrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="flex flex-col mb-2 mx-auto max-w-5xl bg-white px-5 py-5 shadow-lg min-h-screen">
          {/* btnsection */}
          <GroupHeader
            groupId={groupId}
            imgUrl={groupDetails.imgUrl}
            title={groupDetails.title}
            prefecture={groupDetails.prefecture}
            memberCount={groupDetails.memberCount}
            created_by={groupDetails.created_by}
          />

          <div className="flex mt-10 ">
            <div>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2 ml-5"
                onClick={() => handleScrollToSection(aboutRef)}
              >
                About
              </button>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2"
                onClick={() => handleScrollToSection(membersRef)}
              >
                Members
              </button>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 
                text-center m-2"
                onClick={() => handleScrollToSection(eventsRef)}
              >
                Events
              </button>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2"
                onClick={() => handleScrollToSection(photoRef)}
              >
                Picture
              </button>
              <Link
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2"
                to={`/group/${groupId}/Chat`}
              >
                Discussion
              </Link>
            </div>
            <div>
              <button
                className={`w-30 font-bold px-5 py-2.5 text-center m-2 ml-10 ${
                  joined
                    ? "text-white bg-red-500 hover:bg-red-800 hover:border-red-600 border-red-400 border-b-4 rounded-lg"
                    : "text-white bg-purple-500 hover:bg-purple-800 hover:border-purple-600 border-purple-400 border-b-4 rounded-lg"
                }`}
                onClick={handleJoinGroupBtn}
                disabled={loading} // Disable button while loading
              >
                {loading
                  ? "Loading..."
                  : joined
                  ? "Leave This Group"
                  : "Join This Group"}
              </button>
            </div>
          </div>

          <About desc={groupDetails.desc} ref={aboutRef} />
          <MemberSection groupId={groupId} members={members} ref={membersRef} />
          <EventsSection events={eventDetails} ref={eventsRef} />
          <Photo ref={photoRef} />
        </div>
      </div>
    </>
  );
}

export default GroupPage;
