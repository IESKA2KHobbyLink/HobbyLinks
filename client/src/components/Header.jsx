import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex justify-between gap-5 align-top mx-auto sticky top-0 z-20 max-w-screen-2xl  py-2 bg-white shadow-md">
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
        <button className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">
          Login
        </button>
      </div>
    </div>
  );
}

export default Header;
