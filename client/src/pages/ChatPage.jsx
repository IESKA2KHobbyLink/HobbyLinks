import React, { useEffect } from "react";
import SendMessage from "../components/chatComponents/SendMessage";
import ReplyMessage from "../components/chatComponents/ReplyMessage";
import echo from "../api/laravelEcho";

function ChatPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUserId = currentUser ? currentUser.data.user_id : null;
  useEffect(() => {
    // Connect to Laravel Echo with the user's authentication credentials
    console.log(echo.channel(`private-chat-channel.${currentUserId}`));

    echo.private(`private-chat-channel.${currentUserId}`).listen(".chat.message", (event) => {
      console.log("Received chat message:", event);
      // Update the chat UI with the new message
    });

    // Clean up the Echo connection when the component unmounts
    return () => {
      echo.leaveChannel(`chat.${currentUserId}`);
    };
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800'>
      <div className='flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden'>
        <div className='flex flex-col flex-grow h-0 p-4 overflow-auto'>
          <SendMessage />
          <ReplyMessage />
        </div>
        {/* inputbox */}
        <div className='bg-gray-300 p-4'>
          <input
            className='flex items-center h-10 w-full rounded px-3 text-sm'
            type='text'
            placeholder='Type your message…'
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
