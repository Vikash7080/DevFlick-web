import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { AnimatePresence, motion } from "framer-motion";

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
  const [activeTab, setActiveTab] = useState("basic");

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
      <div className="flex flex-col lg:flex-row gap-10 px-4 py-10 max-w-6xl mx-auto">
        {/* LEFT PANEL */}
        <div className="bg-base-300 w-full lg:w-1/2 rounded-2xl shadow-md border border-neutral/30 p-6 flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-5 py-2 rounded-full text-sm font-semibold ${
                activeTab === "basic"
                  ? "bg-primary text-white shadow"
                  : "bg-neutral text-white/70"
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`px-5 py-2 rounded-full text-sm font-semibold ${
                activeTab === "social"
                  ? "bg-primary text-white shadow"
                  : "bg-neutral text-white/70"
              }`}
            >
              Social Links
            </button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "basic" && (
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
                <span className="text-xs text-gray-400 mt-1">{about.length}/200</span>
              </label>
            </div>
          )}

          {activeTab === "social" && (
            <div className="text-center text-gray-400 py-10">
              🚧 Social links section coming soon...
            </div>
          )}

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

          <button className="btn btn-primary w-full mt-6" onClick={saveProfile}>
            Save Profile
          </button>
        </div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-base-300 w-full lg:w-1/2 rounded-2xl shadow-md border border-neutral/30 p-6 flex items-center justify-center"
        >
          <div className="w-full max-w-sm">
            <UserCard
              user={{ firstName, lastName, photoUrl, age, gender, about }}
              preview
            />
          </div>
        </motion.div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="toast toast-top toast-center z-50 fixed top-4 left-1/2 -translate-x-1/2"
          >
            <div className="alert alert-success shadow-lg">
              <span>✅ Profile saved successfully.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditProfile;
