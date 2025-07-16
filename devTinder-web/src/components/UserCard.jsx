// src/components/UserCard.jsx
import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  const {
    firstName = "Unknown",
    lastName = "",
    photoUrl,
    age,
    gender,
    about = "No bio provided by this user.",
  } = user;

  return (
    <div className="card w-full max-w-sm bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-800 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <figure className="p-4">
        <img
          src={photoUrl || "https://placehold.co/400x400?text=No+Image"}
          alt={`${firstName} ${lastName}`}
          className="rounded-xl h-64 w-full object-cover bg-gray-100 dark:bg-gray-800"
        />
      </figure>

      <div className="card-body items-center text-center px-5 py-4">
        <h2 className="card-title text-lg md:text-xl font-semibold text-neutral-800 dark:text-white">
          {firstName.toUpperCase()} {lastName.toUpperCase()}
        </h2>

        {(age || gender) && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {age && <span>{age} yrs</span>}
            {age && gender && <span> &bull; </span>}
            {gender && <span className="capitalize">{gender}</span>}
          </p>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          {about}
        </p>

        <div className="card-actions justify-center mt-5 gap-4">
          <button className="btn btn-outline border-red-500 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition font-medium">
            Ignore
          </button>
          <button className="btn bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium shadow-md">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
