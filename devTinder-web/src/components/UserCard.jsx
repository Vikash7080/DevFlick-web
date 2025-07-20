import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, preview = false }) => {
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
    <div
      className={`w-full bg-base-300 rounded-xl shadow-md border border-neutral/20 p-6 flex ${
        preview
          ? "flex-col items-center text-center"
          : "flex-col sm:flex-row items-center sm:items-start justify-between"
      } gap-4`}
    >
      {/* Avatar + Info */}
      <div
        className={`flex ${preview ? "flex-col items-center" : "items-center"} gap-4 w-full`}
      >
       <img
  src={photoUrl || "https://placehold.co/100x100?text=User"}
  alt="User"
  className="w-24 h-24 rounded-full border-4 border-primary shadow-md object-cover object-top"
/>

        <div className={preview ? "mt-2" : ""}>
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-500">
              {age}, {gender}
            </p>
          )}
          {about && <p className="text-sm text-gray-400 mt-1">{about}</p>}
        </div>
      </div>

      {/* Buttons (Only for non-preview) */}
      {!preview && _id && (
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
