import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Zap } from "lucide-react";

const SmartFeedButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const feed = useSelector((store) => store.feed || []);
  const [newUsersCount, setNewUsersCount] = useState(0);

  useEffect(() => {
    setNewUsersCount(feed.length);
  }, [feed]);

  // Hide button if already on /feed
  if (location.pathname === "/feed") return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
      <button
        onClick={() => navigate("/feed")}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-md hover:bg-white/100 text-gray-900 font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer relative"
        title={newUsersCount > 0 ? `${newUsersCount} new developers!` : "Go to Feed"}
      >
        <Zap size={20} className="text-yellow-500" />
        <span className="text-sm md:text-base">Feed</span>

        {newUsersCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-sm">
            {newUsersCount > 99 ? "99+" : newUsersCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default SmartFeedButton;
