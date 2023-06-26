import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import GroupHeader from "../components/groupComponents/GroupHeader";
import About from "../components/groupComponents/About";
import EventsSection from "../components/groupComponents/EventsSection";
import Photo from "../components/groupComponents/Photo";
import axios from "axios";

function GroupPage() {
  const { groupId } = useParams();

  // Define the values in state
  const [groupDetails, setGroupDetails] = useState({
    imgUrl: "",
    title: "",
    desc: "",
    groupId: groupId,
    created_by: "",
    events: [],
  });

  const [user, setuser] = useState("");

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/groups/${groupId}`
        );

        setGroupDetails({
          title: response.data.group_name,
          desc: response.data.desc,
          groupId: groupId,
          events: response.data.events,
          imgUrl: response.data.header_path,
          created_by: response.data.created_by,
        });
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/${groupDetails.created_by}`
        );
        console.log("userRes", response);
        setuser(response.data.user_name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchGroupData();
    if (groupDetails.created_by) {
      fetchUser();
    }
  }, [groupId, groupDetails.created_by]);

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="flex flex-col mb-2 mx-auto max-w-5xl bg-white px-5 py-5 shadow-lg min-h-screen">
          {/* btnsection */}
          <GroupHeader
            groupId={groupId}
            imgUrl={groupDetails.imgUrl}
            title={groupDetails.title}
            user={user}
          />

          <div className="flex mt-10 ">
            <div>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2 ml-5"
              >
                About
              </button>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2"
              >
                Members
              </button>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 
                text-center m-2"
              >
                Events
              </button>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2"
              >
                Picture
              </button>
              <button
                type=""
                className="w-[130px] border hover:border-purple-500 border-b-4 font-medium rounded-lg text-lg px-5 py-2.5 text-center m-2"
              >
                Discussion
              </button>
            </div>
            <div>
              <button className="w-30 text-white bg-purple-500 hover:bg-purple-800 hover:border-purple-600 border-purple-400 border-b-4   rounded-lg  font-bold px-5 py-2.5 text-center m-2 ml-10">
                Join This Group
              </button>
            </div>
          </div>

          <About desc={groupDetails.desc} />
          <EventsSection events={groupDetails.events} />
          <Photo />
        </div>
      </div>
    </>
  );
}

export default GroupPage;
