import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary loading-xl" />
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-7xl mb-4 animate-bounce">🫂</div>
        <h1 className="text-3xl font-extrabold text-white mb-2">
          No Connections Yet
        </h1>
        <p className="text-gray-400 max-w-lg">
          You haven’t connected with anyone yet. Explore developer profiles and
          send connection requests to grow your network!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
        👥 Your Connections
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {connections.map((connection, index) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={index}
              className="bg-[#1f1f1f] rounded-3xl shadow-2xl border border-gray-700 p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:shadow-purple-500/50"
            >
              <div className="relative w-28 h-28 mb-4">
                <img
                  src={photoUrl || "https://placehold.co/120x120?text=User"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gradient-to-tr from-purple-500 via-pink-500 to-red-500 shadow-lg"
                />
              </div>
              <h2 className="text-xl font-semibold text-white mb-1">
                {firstName} {lastName}
              </h2>
              {(age || gender) && (
                <p className="text-sm text-gray-400 mb-2">
                  {age}
                  {age && gender ? ", " : ""}
                  {gender}
                </p>
              )}
              <p className="text-sm text-gray-300 mt-2 line-clamp-4">
                {about || "No bio available."}
              </p>

              {/* Chat Button */}
              <button
                onClick={() => navigate(`/chat/${_id}`)}
                className="mt-6 flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-5 py-2 rounded-2xl font-medium shadow-lg transition-all hover:shadow-pink-500/50 hover:scale-105 cursor-pointer"
              >
                <MessageCircle size={18} /> Chat
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
