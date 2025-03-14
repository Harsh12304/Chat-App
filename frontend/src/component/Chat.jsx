import React, { useState, useEffect } from "react";
import io from "socket.io-client"; // Import socket.io-client

const socket = io("http://localhost:3000"); // Connect to the server

function Chat({ setPage }) { // Assuming setPage is passed as a prop
  const [messages, setMessages] = useState([]); // To store messages
  const [message, setMessage] = useState(""); // To handle the input
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const [toUserId, setToUserId] = useState(""); // Private message recipient

  // Receive messages
  useEffect(() => {
    socket.on("loadMessages", (data) => {
      setMessages(data);
    });

    socket.on("receivePrivateMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("typing", (data) => {
      // Handle typing indicator
      setIsTyping(`${data.username} is typing...`);
    });

    socket.on("stopTyping", () => {
      setIsTyping("");
    });

    return () => {
      socket.off("loadMessages");
      socket.off("receivePrivateMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  // Send private message
  const sendMessage = () => {
    socket.emit("sendPrivateMessage", { toUserId, fromUser: "username", message });
    setMessage(""); // Clear message input after sending
  };

  // Typing indicator
  const handleTyping = () => {
    socket.emit("typing", { username: "username", toUserId });
  };

  const handleStopTyping = () => {
    socket.emit("stopTyping", { username: "username", toUserId });
  };

  return (
    <div className="chat-container flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4 bg-gray-100">
        {/* Display messages */}
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col p-2 bg-white rounded-lg shadow-sm">
            <span className="font-bold">{msg.username}</span>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && <div className="text-gray-500 italic">{isTyping}</div>}
      </div>

      {/* Input for message */}
      <div className="p-4 bg-white border-t">
        <input
          type="text"
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={handleTyping}
          onBlur={handleStopTyping}
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Send
        </button>
      </div>

      {/* Admin Login Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Admin Login?{" "}
          <button
            onClick={() => setPage("admin")}
            className="text-blue-500 hover:underline"
          >
            Admin Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Chat;
