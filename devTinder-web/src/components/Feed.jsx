// src/components/Feed.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed || []);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      const usersArray = res.data.data; // ✅ extract the array

      if (Array.isArray(usersArray)) {
        dispatch(addFeed(usersArray));
      } else {
        console.warn("API /feed did not return a valid array:", res.data);
        dispatch(addFeed([]));
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]);

  if (!Array.isArray(feed)) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ Invalid feed data. Please try again later.
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No users found in the feed.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {feed.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Feed;
