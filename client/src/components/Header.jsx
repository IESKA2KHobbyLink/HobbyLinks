import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";

import axios from "axios";
import { SearchContext } from "../context/SearchContext";
import { UserDetailsContext } from "../context/UserDetailsContext";

function Header() {
  const http = axios.create({
    baseURL: "http://localhost:8000",

    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },

    withCredentials: true,
  });

  //Context
  const { searchValue, handleSearchChange } = useContext(SearchContext); //handle search
  const { userDetails } = useContext(UserDetailsContext); // userContext

  const handleInputChange = (e) => {
    handleSearchChange(e.target.value);
  };

  //show login form || register form

  const [showModal1, setShowModal1] = useState(false);

  const [showModal2, setShowModal2] = useState(false);

  const [user, setUser] = useState(
    localStorage.hasOwnProperty("currentUser") === true
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  //handle Login

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const csrf = await http.get("/sanctum/csrf-cookie");
      const login = await http.post("/api/login", {
        email,
        password,
      });

      const current = localStorage.setItem(
        "currentUser",
        JSON.stringify(login)
      );

      setUser(login);

      setShowModal1(false);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  //handle logout
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      const logout = await http.post("/api/logout");

      localStorage.removeItem("currentUser");

      setUser(null);
      navigate(`/`);
    } catch (error) {
      console.error("Request failed:", error);
      localStorage.removeItem("currentUser");
      setUser(null);
      navigate(`/`);
    }
  };

  //handle register
  const [file, setFile] = useState(undefined);
  const [name, setName] = useState("");

  const [birthday, setBirthday] = useState("");

  const [gender, setGender] = useState("");

  const [registerMail, setRegisterMail] = useState("");
  const [regisPassword, setRegisPassword] = useState("");
  //console.log(name, birthday, gender, registerMail, regisPassword, file);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  //console.log(handleFileChange);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_name", name);
      formData.append("birthday", birthday);
      formData.append("gender", gender);
      formData.append("email", registerMail);
      formData.append("password", regisPassword);
      formData.append("image", file);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const register = await http.post(
        "http://localhost:8000/api/users",
        formData
      );
      console.log("Registration successful", register);

      //login after register
      const login = await http.post("/api/login", {
        email: registerMail,
        password: regisPassword,
      });

      const current = localStorage.setItem(
        "currentUser",
        JSON.stringify(login)
      );
      setUser(login);
      setShowModal2(false);

      setFile(undefined);
      setName("");
      setBirthday("");
      setGender("");
      setRegisterMail("");
      setRegisPassword("");
    } catch (error) {
      console.error("Register failed:", error);
    } finally {
      setLoading(false);
    }
  };
  let imgPath = "";
  let nameSplit = "";
  let placeHolderImg = "";
  if (user) {
    imgPath = `http://localhost:8000${user.data.profile_pic}`;
    nameSplit = user.data.user_name.split(" ");
    placeHolderImg = `https://ui-avatars.com/api/?name=${nameSplit[0]}+${nameSplit[1]}`; // create dynamic avatar
  }

  return (
    <Fragment>
      <div className="flex justify-between gap-5 align-top mx-auto sticky top-0 z-20 max-w-[2560px] px-10 py-2 bg-white shadow-md">
        <div className="flex gap-4">
          <Link to={`/`} className="">
            <div className="font-bold text-2xl cursor-pointer bg-purple-500 text-white rounded px-4 py-1 ">
              HOBBYLINKS
            </div>
          </Link>

          <div>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none"
              value={searchValue}
              onChange={handleInputChange}
            />

            <input
              type="text"
              className="py-2 px-4 border  border-gray-300 focus:outline-none"
              placeholder="Osaka,Japan"
              value=""
            />
            <Link
              to={`/`}
              className="bg-purple-500 text-white py-[9px] px-4 rounded-r-md hover:bg-purple-600 "
            >
              <i className="fas fa-search"></i>
            </Link>
          </div>
        </div>

        {/* if Login show create from */}

        <div>
          {user != null ? (
            <>
              <div className="flex gap-1">
                <Link
                  to={`/UserProfile/${user.data.user_id}`}
                  className="text-gray-700 font-bold mr-2  text-center  flex"
                >
                  <img
                    className="w-10 h-10 rounded-full border-4 border-slate-50 object-cover"
                    src={
                      user && imgPath == "http://localhost:8000null"
                        ? placeHolderImg
                        : imgPath
                    }
                  />
                  <p className="pt-2">{user.data.user_name}</p>
                </Link>
                <Link
                  to="/createGroup"
                  className="border hover:border-b-purple-500 border-b-4 font-medium rounded-lg px-4 py-2 text-center h-10 "
                >
                  Create Group
                </Link>

                <Link
                  to="/createEvent"
                  className="border hover:border-b-purple-500 border-b-4 font-medium rounded-lg px-4 py-2 text-center h-10"
                >
                  Create Event
                </Link>

                <button
                  className=" border hover:border-purple-500  border-b-4 border-r-4 font-medium rounded-lg  px-4 py-2 
                  text-center h-10 "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 mr-2 font-bold"
                onClick={() => setShowModal1(true)}
              >
                Login
              </button>

              <button
                className="border py-2 px-4 rounded-md hover:border-purple-500 font-bold"
                onClick={() => setShowModal2(true)}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Login Form */}

      <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="text-gray-800 font-bold text-2xl mb-1">Sign in</h3>

          <br></br>

          <form className="spacy-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Your Email
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>

                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="hobbylink@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Your Password
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>

                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <div>
              <a href="#" className="text-sm text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            <br></br>

            <button
              type="submit"
              className="w-full text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
          {loading && (
            <div role="status" className="pt-4 flex">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Register Form */}
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="text-gray-800 font-bold text-xl mb-4">Sign up</h3>

          <form className="spacy-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Name
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>

                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="HobbyLinks"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Birthday
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
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
                  name="birthday"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Gender
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
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

                  <circle cx="7" cy="5" r="2" />

                  <path d="M5 22v-5l-1-1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />

                  <circle cx="17" cy="5" r="2" />

                  <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
                </svg>

                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
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

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2 ">
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
                  name="header_path"
                  id="header_path"
                  className="boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </div>
            </div>
            {/* banner upload */}
            {/* <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Email
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>

                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFileChange}
                  className="boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </div>
            </div> */}

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Email
              </label>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={registerMail}
                  onChange={(e) => setRegisterMail(e.target.value)}
                  className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="hobbylinks@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Password
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>

                <input
                  type="password"
                  name="password"
                  id="password"
                  value={regisPassword}
                  onChange={(e) => setRegisPassword(e.target.value)}
                  placeholder="******"
                  className="boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <br></br>

            <button
              type="submit"
              className="w-full text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create Account
            </button>
          </form>
          {loading && (
            <div role="status" className="pt-4 flex">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </Modal>
    </Fragment>
  );
}

export default Header;
