import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
    }
  }, [user]);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  if (!user) {
    return <div className="text-center text-red-500 mt-20">User not found.</div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 px-4 py-10 max-w-6xl mx-auto">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 bg-base-300 rounded-2xl shadow-md p-6 border border-neutral/30">
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="form-control">
              <span className="label-text">First Name</span>
              <input
                className="input input-bordered"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="label-text">Last Name</span>
              <input
                className="input input-bordered"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control col-span-full">
              <span className="label-text">Photo URL</span>
              <input
                className="input input-bordered"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="label-text">Age</span>
              <input
                type="number"
                min="0"
                className="input input-bordered"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="label-text">Gender</span>
              <select
                className="select select-bordered"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="form-control col-span-full">
              <span className="label-text">About</span>
              <textarea
                className="textarea textarea-bordered"
                maxLength={200}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <span className="text-xs text-gray-400">{about.length}/200</span>
            </label>
          </div>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          <button className="btn btn-primary w-full mt-6" onClick={saveProfile}>
            Save Profile
          </button>
        </div>

        {/* Right: Preview */}
        <div className="w-full lg:w-1/2">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
