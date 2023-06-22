import React, { useState, useEffect } from "react";
import Filter from "./Filter";

function Searchbar({ showList, setShowList }) {
  const handleEventbtn = () => {
    setShowList("event");
  };
  const handleGroupbtn = () => {
    setShowList("group");
  };

  return (
    <div className='max-w-7xl mx-auto sticky top-14 z-10 backdrop-blur-lg border-b pt-2 '>
      <Filter></Filter>
      {/* Groups,Events ボタン */}
      <div className='flex gap-0.5 '>
        <button
          className={`w-1/2 h-fit max-w-xl mt-2 mb-1 text-2xl text-neutral-800  font-bold transition duration-150 border-b-8 ${
            showList === "group" ? "border-purple-500" : "border-transparent"
          } hover:bg-neutral-300`}
          onClick={() => handleGroupbtn()}
        >
          Groups
        </button>
        <button
          className={`w-1/2 h-fit  max-w-xl mt-2 text-2xl text-neutral-800  font-bold transition duration-150 border-b-8 ${
            showList === "event" ? "border-purple-500" : "border-transparent"
          } hover:bg-neutral-300`}
          onClick={() => handleEventbtn()}
        >
          Events
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
