import React from "react";
import SendMessage from "../components/chatComponents/SendMessage";
import ReplyMessage from "../components/chatComponents/ReplyMessage";

function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <SendMessage />
          <ReplyMessage />
        </div>
        {/* inputbox */}
        <div className="bg-gray-300 p-4">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Type your message…"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
