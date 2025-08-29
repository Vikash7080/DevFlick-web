import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Feed fetch failed:", err);
    }
  };

  useEffect(() => { getFeed(); }, []);

  if (!feed) return null;
  if (feed.length === 0) {
    return (
      <h1 className="flex justify-center text-white text-lg font-medium mt-10">
        No new users found!
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 max-w-4xl mx-auto h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
      {/* Heading */}
      <motion.div
        className="text-center mb-6 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full inline-block shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          👋 {user?.firstName || "Developer"}, explore your DevFlick Feed
        </h2>
        <p className="text-gray-200 text-sm md:text-base mt-1">
          Discover like-minded developers and collaborate globally!
        </p>
      </motion.div>

      {/* Feed cards */}
      <AnimatePresence>
        {feed.map((user, index) => (
          <motion.div
            key={user._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="w-full"
          >
            <UserCard user={user} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
