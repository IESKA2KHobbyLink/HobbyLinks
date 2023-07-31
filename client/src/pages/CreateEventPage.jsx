import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_API;

function CreateEventPage() {
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  //get user from localstorage
  const [user, setUser] = useState(
    localStorage.hasOwnProperty("currentUser") === true
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );
  //fetch user created groups
  useEffect(() => {
    const fetchUserCreatedGroups = async () => {
      try {
        const userGroups = await http.get(
          `http://localhost:8000/api/user/${user.data.user_id}/created_groups`
        );

        setUserCreatedGroup(userGroups.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserCreatedGroups();
  }, [user.data.user_id]);

  const [userCreatedGroups, setUserCreatedGroup] = useState([]); //fetch http://localhost:8000/api/user/{id}/created_groups

  //geocoder stuff
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geocoder = useRef(null);
  const geocoderContainer = useRef(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // Get user's current lng lat
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;

          setLng(longitude);
          setLat(latitude);
        },
        (error) => {
          console.log("Error retrieving location:", error.message);
        }
      );
    }
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (lng !== null && lat !== null && map.current === null) {
      //new map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      // Initialize the geocoder
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: {
          color: "orange",
        },
      });

      // Add the geocoder to the map
      map.current.addControl(geocoder, "top-left");

      // Listen to the "result" event of the geocoder
      geocoder.on("result", (event) => {
        const lnglat = event.result.center;
        const address = event.result.place_name;
        console.log(lnglat); // 0: lng, 1: lat
        console.log(address); // address
        setAddress(address);
        setLngLat(lnglat);
      });

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }
  }, [lng, lat]); // Runs when lng or lat change

  //From Input State
  const user_id = user.data.user_id;
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [group_id, setGroup_id] = useState("");
  const [lnglat, setLngLat] = useState([]);
  const [file, setFile] = useState(undefined);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("event_name", eventName);
      formData.append("date", date);
      formData.append("prefecture", prefecture);
      formData.append("address", address);
      formData.append("desc", desc);
      formData.append("created_by", user_id);
      formData.append("type", type);
      formData.append("image", file);
      formData.append("group_id", group_id);
      formData.append("lng", lnglat[0]);
      formData.append("lat", lnglat[1]);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const submit = await http.post(
        "http://localhost:8000/api/events",
        formData
      );
      console.log("Event Created", submit);
      navigate(`/`);
    } catch (error) {
      console.error("Create event fail", error);
    }
  };

  return (
    <div className="py-6 px-6 lg:px-8 text-left md:w-[600px] w-[90%] mx-auto flex flex-col">
      <h3 className="text-gray-800 font-bold text-2xl mb-1">Create Event</h3>
      <br></br>
      <form className="spacy-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="event_name"
            className="block mb-2 text-sm font-medium text-grey-900"
          >
            Event Name
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              className="h-5 w-5 text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="3.6" y1="9" x2="20.4" y2="9" />
              <line x1="3.6" y1="15" x2="20.4" y2="15" />
              <path d="M11.5 3a17 17 0 0 0 0 18" />
              <path d="M12.5 3a17 17 0 0 1 0 18" />
            </svg>
            <input
              type="text"
              name="event_name"
              id="event_name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              placeholder="HobbyLinks"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-grey-900"
          >
            Groups
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <select
              id="type"
              name="type"
              value={group_id}
              onChange={(e) => setGroup_id(e.target.value)}
              className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            >
              <option value="0">-- Select --</option>
              {userCreatedGroups.map((group) => (
                <option key={group.group_id} value={group.group_id}>
                  {group.group_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="start_date"
            className="block mb-2 text-sm font-medium text-grey-900"
          >
            Start Date
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              className="h-5 w-5 text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="4" y="5" width="16" height="16" rx="2" />
              <line x1="16" y1="3" x2="16" y2="7" />
              <line x1="8" y1="3" x2="8" y2="7" />
              <line x1="4" y1="11" x2="20" y2="11" />
              <line x1="11" y1="15" x2="12" y2="15" />
              <line x1="12" y1="15" x2="12" y2="18" />
            </svg>
            <input
              type="date"
              name="start_date"
              id="start_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="prefecture"
            className="block mb-2 text-sm font-medium text-grey-900"
          >
            Prefecture
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              className="h-5 w-5 text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="11" r="3" />
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
            </svg>
            <input
              type="text"
              name="prefecture"
              id="prefecture"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              placeholder="Osaka"
              required
            />
          </div>
        </div>

        {/* <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-grey-900"
          >
            Address
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
               className="h-5 w-5 text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <line x1="18" y1="6" x2="18" y2="6.01" />
              <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
              <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
              <line x1="9" y1="4" x2="9" y2="17" />
              <line x1="15" y1="15" x2="15" y2="20" />
            </svg>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              placeholder="2-3-35 Nakazaki Nishi, Kita Ward, Osaka City"
              required
            />
          </div>
        </div> */}

        {/* Map */}

        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-grey-900"
        >
          Address
        </label>
        <div id="map" className="w-full h-44 mb-6 ">
          <div ref={mapContainer} className="h-full rounded-lg" />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-grey-900"
          >
            Type
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              className="h-5 w-5 text-gray-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="8" y1="12" x2="8" y2="12.01" />
              <line x1="12" y1="12" x2="12" y2="12.01" />
              <line x1="16" y1="12" x2="16" y2="12.01" />
            </svg>
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            >
              <option value="0">-- Select --</option>
              <option value="Inperson">Inperson</option>
              <option value="Online">Online</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="header_path"
            className="block mb-2 text-sm font-medium text-grey-900 "
          >
            Photo
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              className="boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="desc"
            className="block mb-2 text-sm font-medium text-grey-900"
          >
            Description
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="17" y1="10" x2="3" y2="10" />
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="14" x2="3" y2="14" />
              <line x1="17" y1="18" x2="3" y2="18" />
            </svg>
            <textarea
              type="text"
              name="desc"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Welcome to our event"
              rows="5"
              className=" boder border-gray-300 text-sm rounded-lg focus:outline-none  block w-full p-2.5"
              required
            ></textarea>
          </div>
        </div>
        <br></br>

        <button
          type="submit"
          className="w-full text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
