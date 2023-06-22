import React from "react";

function Sidebar() {
  return (
    <div className="max-h-fit sticky  top-14 z-10  mx-2 pt-[4px]">
      <ul className="bg-neutral-300 rounded  min-h-max">
        <li className="flex  justify-start h-12 cursor-pointer items-center truncate  px-6 py-4 border-b hover:bg-neutral-100 ">
          Home
        </li>
        <li className="flex  justify-start h-12 cursor-pointer items-center truncate  px-6 py-4 border-b hover:bg-neutral-100 ">
          Your Events
        </li>
        <li className="flex  justify-start h-12 cursor-pointer items-center truncate  px-6 py-4 border-b hover:bg-neutral-100">
          Your Group
        </li>
        <li className="flex  justify-start h-12 cursor-pointer items-center truncate  px-6 py-4 border-b hover:bg-neutral-100">
          Profile
        </li>
        <li className="flex  justify-start h-12 cursor-pointer items-center truncate  px-6 py-4 border-b hover:bg-neutral-100">
          Login
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
