import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
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
    <div className="w-full bg-base-300 rounded-xl shadow-md p-6 border border-neutral/20 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
      {/* Left: Avatar and User Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={photoUrl || "https://placehold.co/100x100?text=User"}
          alt="User"
          className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-md"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-500">
              {age}, {gender}
            </p>
          )}
          {about && (
            <p className="text-sm text-gray-400 mt-1">{about}</p>
          )}
        </div>
      </div>

      {/* Right: Buttons */}
      {_id && (
        <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-0 sm:self-center">
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-sm btn-success"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
