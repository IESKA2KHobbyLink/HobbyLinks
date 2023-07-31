import React from "react";

const SendMessage = ({ message }) => {
  console.log(message);
  const imgpath = `http://localhost:8000${message.sender.profile_pic}`;
  // console.log(imgpath);
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end items-center">
      <div>
        <span className="text-xs text-gray-500 leading-none">
          {message.sender.user_name}
        </span>
        <div className="bg-purple-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">{message.text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>

      <img
        className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"
        src={imgpath}
      ></img>
    </div>
  );
};

export default SendMessage;
