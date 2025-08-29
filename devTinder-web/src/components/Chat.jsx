import { useEffect, useState, useRef } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection, getSocket } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState(null); // NEW: typing indicator
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // fetch old messages
  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          userId: senderId?._id,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  // init socket
  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // 🔥 Listen for typing events
    socket.on("userTyping", ({ userId: typingId }) => {
      if (typingId !== userId) {
        setTypingUser("User is typing...");
        setTimeout(() => setTypingUser(null), 2000); // auto clear after 2s
      }
    });

    return () => {
      socket.off("messageReceived");
      socket.off("userTyping");
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = getSocket();
    if (!socket) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-full md:w-3/4 mx-auto mt-6 h-[85vh] flex flex-col 
      bg-gradient-to-br from-gray-900 via-gray-950 to-black 
      rounded-2xl shadow-2xl overflow-hidden border border-gray-800 backdrop-blur-xl">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/60 backdrop-blur-md">
        <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
          💬 Live Chat
        </h1>
        <span className="text-xs text-green-400 font-semibold animate-pulse flex items-center">
          ● Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin 
        scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((msg, index) => {
          const isUser = userId === msg.userId;
          const time = new Date(msg.createdAt || Date.now());
          const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex flex-col max-w-full sm:max-w-[75%] ${
                isUser ? "ml-auto items-end" : "items-start"
              }`}
            >
              <div className="text-xs text-gray-400 mb-1">
                {`${msg.firstName} ${msg.lastName}`}
              </div>
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow-lg 
                  backdrop-blur-md break-words transition-all duration-300 ${
                    isUser
                      ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-br-none hover:shadow-indigo-500/40"
                      : "bg-gray-800/70 text-gray-100 rounded-bl-none hover:shadow-gray-600/40"
                  }`}
              >
                {msg.text}
              </div>
              <div className="text-[10px] text-gray-400 mt-1 flex justify-end pr-2">
                {formattedTime}
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
{/*typing indicator*/}
{typingUser && (
  <div className="px-4 pb-1 text-xs flex items-center gap-1">
    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
      Typing
    </span>
    <span className="flex space-x-1">
      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-bounce [animation-delay:-0.3s]"></span>
      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-bounce [animation-delay:-0.15s]"></span>
      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-bounce"></span>
    </span>
  </div>
)}


      {/* Input */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/60 backdrop-blur-md flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            const socket = getSocket();
            if (socket) {
              socket.emit("typing", { userId, targetUserId });
            }
          }}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800/70 border border-gray-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 transition"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          onClick={sendMessage}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 
            text-white p-3 rounded-full shadow-md shadow-indigo-500/30 transition flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default Chat;
