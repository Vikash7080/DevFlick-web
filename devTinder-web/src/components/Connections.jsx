import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data || []));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-pink-500 loading-xl" />
      </div>
    );
  }

  // No connections
  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="text-7xl mb-6 animate-bounce">🫂</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          No Connections Yet
        </h1>
        <p className="text-gray-400 max-w-md leading-relaxed">
          You haven’t connected with anyone yet. Explore developer profiles and
          send connection requests to grow your network!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-14 
                   bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
                   bg-clip-text text-transparent drop-shadow-lg"
      >
        👥 Your Connections
      </motion.h1>

      {/* Connections Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {connections.map((connection, index) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gradient-to-br from-[#1a1a1a] via-[#1f1f1f] to-[#242424] 
                         rounded-3xl shadow-xl border border-gray-700 p-6 
                         flex flex-col items-center text-center 
                         transform transition duration-500 
                         hover:scale-105 hover:shadow-pink-500/40"
            >
              {/* Profile Picture */}
              <div className="relative w-28 h-28 mb-5">
                <img
                  src={photoUrl || "https://placehold.co/120x120?text=User"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-[3px] 
                             border-transparent bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 
                             p-[2px] shadow-lg"
                />
              </div>

              {/* Name */}
              <h2 className="text-lg font-bold text-white mb-1">
                {firstName} {lastName}
              </h2>

              {/* Age + Gender */}
              {(age || gender) && (
                <p className="text-sm text-gray-400 mb-2">
                  {age}
                  {age && gender ? ", " : ""}
                  {gender}
                </p>
              )}

              {/* About */}
              <p className="text-sm text-gray-300 mt-2 line-clamp-4 leading-relaxed">
                {about || "No bio available."}
              </p>

              {/* Chat Button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.08 }}
                onClick={() => navigate(`/chat/${_id}`)}
                className="mt-6 flex items-center gap-2 
                           bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                           text-white px-6 py-2.5 rounded-full font-semibold 
                           shadow-md shadow-pink-500/30 
                           hover:shadow-pink-500/60 hover:brightness-110 
                           active:scale-95 cursor-pointer transition-all duration-300"
              >
                <MessageCircle size={18} className="animate-pulse" />
                <span>Chat</span>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
