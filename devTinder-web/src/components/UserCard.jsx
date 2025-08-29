import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

const UserCard = ({ user, preview = false }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills = [],
    githubUrl,
  } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="w-full max-w-md mx-auto rounded-3xl shadow-2xl p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/60 border border-white/10 backdrop-blur-md text-white flex flex-col items-center text-center transition-all duration-300"
    >
      {/* Avatar */}
      <div className="relative w-28 h-28">
        <img
          src={photoUrl || "https://placehold.co/150x150?text=User"}
          alt={`${firstName} ${lastName}`}
          className="w-28 h-28 rounded-full border-4 border-gradient-to-br from-primary to-secondary object-cover shadow-lg"
        />
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
      </div>

      {/* Name, Age, Gender */}
      <div className="mt-4">
        <h2 className="text-2xl font-extrabold">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-gray-400 text-sm mt-1">
            {age}, {gender}
          </p>
        )}
      </div>

      {/* About */}
      {about && (
        <p className="text-gray-300 text-sm mt-3 px-4">{about}</p>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/30 to-primary/10 text-primary border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* GitHub */}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition font-medium text-sm"
        >
          <Github size={16} /> GitHub
        </a>
      )}

      {/* Buttons */}
      {!preview && _id && (
        <div className="flex gap-4 mt-6">
          <button
            className="px-6 py-2 rounded-full bg-red-600/30 hover:bg-red-500 text-white font-semibold transition cursor-pointer"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="px-6 py-2 rounded-full bg-green-600/30 hover:bg-green-500 text-white font-semibold transition cursor-pointer"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default UserCard;
