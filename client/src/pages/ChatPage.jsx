import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import SendMessage from "../components/chatComponents/SendMessage";
import ReplyMessage from "../components/chatComponents/ReplyMessage";
import { useParams } from "react-router-dom";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("currentUser", currentUser);

  const { groupid } = useParams();

  const socket = io("http://localhost:8080", {
    query: { groupid },
    withCredentials: true,
  });

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      setMessage("");

      // Add the sent message to the messages state for display
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: currentUser.data, text: message },
      ]);

      console.log(messages);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map((msg, index) => (
            <SendMessage key={index} message={msg} />
          ))}
        </div>
        {/* inputbox */}
        <div className="bg-gray-300 p-4 ">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm "
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
