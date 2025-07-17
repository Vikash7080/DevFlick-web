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
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="w-full bg-base-300 rounded-2xl shadow-xl p-6 border border-neutral/20 flex flex-col items-center">
      <img
        src={photoUrl || "https://placehold.co/100x100?text=User"}
        alt="User"
        className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-md mb-4"
      />
      <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
      {age && gender && (
        <p className="text-sm text-gray-500">{age}, {gender}</p>
      )}
      {about && <p className="text-center mt-2">{about}</p>}

      {_id && (
        <div className="flex gap-4 mt-6">
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
