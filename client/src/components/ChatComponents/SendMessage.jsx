import React from "react";

const SendMessage = () => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
      <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <p className="text-sm">Lorem ipsum dolor sit amet.</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">2 min ago</span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
  );
};

export default SendMessage;
