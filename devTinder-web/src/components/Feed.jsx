import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user); // ✅ added to personalize greeting
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Feed fetch failed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <h1 className="flex justify-center text-white text-xl font-medium mt-10">
        No new users found!
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10 max-w-3xl mx-auto h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide">
      
      {/* ✨ Personalized heading */}
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        👋 {user?.firstName || "Developer"}, here’s your DevFlick Feed
      </h2>
      <p className="text-gray-400 text-sm mb-6 text-center">
        Discover new developers and connect to grow together!
      </p>

      {/* Feed cards */}
      {feed.map((user, index) => (
        <UserCard key={user._id || index} user={user} />
      ))}
    </div>
  );
};

export default Feed;
