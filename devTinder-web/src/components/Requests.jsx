import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { motion } from "framer-motion";
import { UserX, UserCheck, Users } from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Review failed", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Fetching requests failed", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20 px-4 text-center animate-fade-in">
        <Users className="w-12 h-12 text-purple-500 mb-4" />
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
          Connection Requests
        </h1>
        <p className="text-lg text-gray-400 flex items-center gap-2">
          <span>🙅‍♂️</span> No new requests right now!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Connection Requests
        </h1>
        <p className="text-gray-400 mt-3 flex justify-center items-center gap-2 text-lg">
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9l-6 6-6-6" />
          </svg>
          Review and respond to new connection requests.
        </p>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request, idx) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <motion.div
              key={_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 
                         p-6 rounded-2xl shadow-lg hover:shadow-2xl 
                         transition transform hover:-translate-y-2 cursor-pointer"
            >
              {/* User Info */}
              <div className="flex flex-col items-center text-center">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  alt="User"
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-md"
                  src={photoUrl}
                />
                <h2 className="mt-4 font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-300 text-sm">
                    {age}, {gender}
                  </p>
                )}
                {about && (
                  <p className="text-gray-400 mt-2 text-sm line-clamp-3">
                    {about}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4 justify-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-5 py-2 rounded-full 
                             bg-red-500/80 text-white font-semibold 
                             hover:bg-red-600 transition duration-200 
                             shadow-md cursor-pointer"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  <UserX size={16} /> Reject
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-5 py-2 rounded-full 
                             bg-green-500/80 text-white font-semibold 
                             hover:bg-green-600 transition duration-200 
                             shadow-md cursor-pointer"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  <UserCheck size={16} /> Accept
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
