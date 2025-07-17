import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();

  // ✅ Safe default if feed is null or not loaded yet
  const feedData = useSelector((store) => store.feed) || [];

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      // Check if res.data is actually an array
      if (Array.isArray(res.data)) {
        dispatch(addFeed(res.data));
      } else {
        console.warn("Feed data is not an array", res.data);
        dispatch(addFeed([]));
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Your Feed 📰</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Discover what your coding network is building. Follow friends, share posts, and grow together!
        </p>

        {feedData.length === 0 ? (
          <div className="text-center bg-[#1f1f1f] p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-xl font-semibold mb-2">Nothing to show here yet 😕</h2>
            <p className="text-gray-400 mb-2">
              Your feed is currently empty. Start by connecting with developers or sharing your first post!
            </p>
            <button className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-medium transition">
              Explore Connections
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {feedData.map((post, index) => (
              <div
                key={index}
                className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={post.userPhoto || "https://via.placeholder.com/100"}
                    alt="User"
                    className="w-12 h-12 rounded-full border border-gray-700"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{post.userName}</h3>
                    <p className="text-sm text-gray-400">{post.time || "Just now"}</p>
                  </div>
                </div>

                <p className="text-gray-300 whitespace-pre-line">{post.content}</p>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="mt-4 w-full rounded-lg object-cover max-h-[400px] border border-gray-700"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
