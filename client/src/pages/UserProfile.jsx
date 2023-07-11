import React, { useState, useEffect, Fragment } from "react";
import JoinedEvent from "../components/userProfile/JoinedEvent";
import JoinedGroup from "../components/userProfile/JoinedGroup";
import UserAbout from "../components/userProfile/UserAbout";
import axios from "axios";
import Modal from "../components/Modal";
import { useParams } from "react-router-dom";

function UserProfile() {
  //axios config for POST
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  //const { groupId } = useParams(); //TODO: use dynamic route

  const [active, setActive] = useState("UserAbout");
  const [userDetails, setUserDetails] = useState([]);
  const [groupDetails, setGroupDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [imgAvatar, setImgAvatar] = useState(undefined);
  const [imgBackground, setImgBackground] = useState(undefined);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUserId = currentUser.data.user_id;
  //console.log(userDetails);

  //FIX: if curret profile use the currentUser data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${currentUserId}`);

        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${currentUserId}/created_groups`
        );

        setGroupDetails(response.data);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };
    fetchGroup();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${currentUserId}/created_events`
        );

        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEvent();
  }, []);

  const handleAvatarFileChange = (event) => {
    setImgAvatar(event.target.files[0]);
  };

  const handleBackgroundFileChange = (event) => {
    setImgBackground(event.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      //setLoading(true);
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("image", imgAvatar);
      formData.append("bg_img", imgBackground);

      //formData.append("imgBackground", imgBackground);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const update = await http.post(`http://localhost:8000/api/users/${currentUserId}`, formData);
      console.log("Profile Updated", update);

      const user = await http.get(`http://localhost:8000/api/users/${currentUserId}`); //fetch user after update
      const current = localStorage.setItem("currentUser", JSON.stringify(user)); //set current user data in localstorage
      setUserDetails(user); //set userdetails
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const imgPath = `http://localhost:8000${userDetails.profile_pic}`;
  console.log(userDetails.profile_pic);
  return (
    <Fragment>
      <div>
        <div className='px-44 shadow'>
          <div className='relative h-80 rounded-b flex justify-center'>
            <img
              src='https://i.pinimg.com/originals/b2/bf/45/b2bf45dd18a62018800974b0a6ca68f0.jpg'
              className='cursor-pointer object-cover w-full h-full rounded-b'
              alt='cover'
              onClick={() => setImgBackground(true)}
            />
            <div className='absolute -bottom-6 card flex justify-content-center'>
              <img
                src={imgPath}
                className='cursor-pointer object-cover border-4 border-white w-40 h-40 rounded-full'
                alt='avatar'
                onClick={() => setImgAvatar(true)}
              />
            </div>
          </div>
          <div className='text-center mt-6 text-3xl font-bold text-fBlack'>
            {userDetails.user_name}
          </div>
          <div className='flex justify-between px-8'>
            <div className='flex items-center'>
              <div
                onClick={() => setActive("UserAbout")}
                className={`cursor-pointer px-4 py-5 text-gray-700 ${
                  active === "UserAbout" ? "text-purple-500 border-b-4 border-purple-500" : ""
                }`}
              >
                About
              </div>
              <div
                onClick={() => setActive("JoinedGroup")}
                className={`cursor-pointer px-4 py-5 text-gray-700 ${
                  active === "JoinedGroup" ? "text-purple-500 border-b-4 border-purple-500" : ""
                }`}
              >
                Groups <span className='text-sm ml-1'>{groupDetails.length}</span>
              </div>
              <div
                onClick={() => setActive("JoinedEvent")}
                className={`cursor-pointer px-4 py-5 text-gray-700 ${
                  active === "JoinedEvent" ? "text-purple-500 border-b-4 border-purple-500" : ""
                }`}
              >
                Events <span className='text-sm ml-1'>{eventDetails.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {active === "UserAbout" && <UserAbout userDetails={userDetails} />}
          {active === "JoinedGroup" && <JoinedGroup groupDetails={groupDetails} />}
          {active === "JoinedEvent" && <JoinedEvent eventDetails={eventDetails} />}
        </div>
        <Modal isVisible={imgAvatar} onClose={() => setImgAvatar(false)}>
          <div className='py-6 px-6 lg:px-8 text-left'>
            <h3 className='text-gray-800 font-bold text-2xl mb-1'>Change Avatar Photo</h3>
            <br></br>
            <form className='spacy-y-6' onSubmit={handleUpdateProfile}>
              <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-2 '>
                <svg
                  className='h-5 w-5 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>

                <input
                  type='file'
                  name='image'
                  id='image'
                  onChange={handleAvatarFileChange}
                  className='boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
                />
              </div>
              <br></br>
              <button
                type='submit'
                className='w-full text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Save
              </button>
            </form>
          </div>
        </Modal>
        <Modal isVisible={imgBackground} onClose={() => setImgBackground(false)}>
          <div className='py-6 px-6 lg:px-8 text-left'>
            <h3 className='text-gray-800 font-bold text-2xl mb-1'>Change Background Photo</h3>
            <br></br>
            <form className='spacy-y-6' onSubmit={handleUpdateProfile}>
              <div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-2 '>
                <svg
                  className='h-5 w-5 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>

                <input
                  type='file'
                  name='imgBackground'
                  id='imgBackground'
                  onChange={handleBackgroundFileChange}
                  className='boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5'
                />
              </div>
              <br></br>
              <button
                type='submit'
                className='w-full text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Save
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
}

export default UserProfile;
