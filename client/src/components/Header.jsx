import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { Fragment, useState } from "react";
import Modal from "./Modal";
import axios from "axios";

function Header() {
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-with": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [user, setUser] = useState(
    localStorage.hasOwnProperty("currentUser") === true
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  console.log("User", user);

  //handle Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const csrf = await http.get("/sanctum/csrf-cookie");
    console.log("csrf :", csrf);
    try {
      const login = await http.post("/api/login", {
        email,
        password,
      });

      const user = await http.get("/api/user");
      const current = localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      setShowModal1(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async (e) => {
    try {
      const logout = await http.post("/api/logout");
      localStorage.removeItem("currentUser");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Fragment>
      <div className="flex justify-between gap-5 align-top mx-auto sticky top-0 z-20 max-w-[2560px] px-10 py-2 bg-white shadow-md">
        <div className="flex gap-5">
          <Link to={`/`} className="font-bold text-2xl cursor-pointer">
            HobbyLinks
          </Link>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="py-2 px-4 border  border-gray-300 focus:outline-none"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button className="bg-purple-500 text-white py-[9px] px-4 rounded-r-md hover:bg-purple-600 ">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {/* if Login show create from */}

        <div>
          {user != null ? (
            <div className="flex ">
              <p className="text-gray-700 font-bold mr-2 text-lg text-center pt-2">
                Welcome,{user.data.user_name}
              </p>

              <button
                className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 mr-2 font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
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
                Lost Password?
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
        </div>

        {/* Register Form */}
      </Modal>
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="text-gray-800 font-bold text-2xl mb-1">Sign up</h3>
          <br></br>
          <form className="spacy-y-6" action="#">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Name
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
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  name="name"
                  id="name"
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
                  name="birthday"
                  id="birthday"
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
                  <circle cx="7" cy="5" r="2" />
                  <path d="M5 22v-5l-1-1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                  <circle cx="17" cy="5" r="2" />
                  <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
                </svg>
                <select
                  id="gender"
                  name="gender"
                  className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                >
                  <option value="0">Male</option>
                  <option value="1">Female</option>
                  <option value="2">Orther</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-grey-900"
              >
                Email
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
        </div>
      </Modal>
    </Fragment>
  );
}

export default Header;
