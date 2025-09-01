import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import { AnimatePresence, motion } from "framer-motion";
import { Github, User, Info, PlusCircle, Save } from "lucide-react";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // ✅ Initialize fields only if user exists
  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photoUrl || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills(user.skills || []);
    setGithubUrl(user.githubUrl || "");
  }, [user]);

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const saveProfile = async () => {
    if (!user) return; // 🔒 Guard: unauthenticated user cannot save

    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills, githubUrl },
        { withCredentials: true }
      );
      if (res?.data?.data) dispatch(addUser(res.data.data));
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
      <div className="flex flex-col lg:flex-row gap-10 px-6 py-10 max-w-6xl mx-auto">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full lg:w-1/2 rounded-3xl shadow-2xl border border-gray-700/50 p-8 backdrop-blur-lg"
        >
          <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-md">
            ✨ Edit Your Profile
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === "basic"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <User size={16} /> Basic Info
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer flex items-center gap-2 ${
                activeTab === "social"
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Info size={16} /> Social Links
            </button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === "basic" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* First Name */}
              <label className="form-control">
                <span className="label-text font-semibold text-gray-200">First Name</span>
                <input
                  className="input input-bordered bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                />
              </label>

              {/* Last Name */}
              <label className="form-control">
                <span className="label-text font-semibold text-gray-200">Last Name</span>
                <input
                  className="input input-bordered bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                />
              </label>

              {/* Photo URL */}
              <label className="form-control col-span-full">
                <span className="label-text font-semibold text-gray-200">Photo URL</span>
                <input
                  className="input input-bordered bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </label>

              {/* Age */}
              <label className="form-control">
                <span className="label-text font-semibold text-gray-200">Age</span>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                />
              </label>

              {/* Gender */}
              <label className="form-control">
                <span className="label-text font-semibold text-gray-200">Gender</span>
                <select
                  className="select select-bordered bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              {/* Skills */}
              <label className="form-control col-span-full">
                <span className="label-text font-semibold text-gray-200">Skills</span>
                <div className="flex gap-2">
                  <input
                    className="input input-bordered bg-gray-800 text-white flex-1 focus:ring-2 focus:ring-pink-500"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. React"
                  />
                  <button
                    type="button"
                    className="btn btn-primary flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 border-none"
                    onClick={addSkill}
                  >
                    <PlusCircle size={16} /> Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-pink-500/20 text-pink-400 font-medium 
                                 rounded-full text-sm flex items-center gap-2 border border-pink-500/40"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-xs hover:text-red-400"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </label>

              {/* About */}
              <label className="form-control col-span-full">
                <span className="label-text font-semibold text-gray-200">About</span>
                <textarea
                  className="textarea textarea-bordered bg-gray-800 text-white h-28 focus:ring-2 focus:ring-pink-500"
                  maxLength={200}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell something about yourself..."
                />
                <span className="text-xs text-gray-400 mt-1">{about.length}/200</span>
              </label>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-6">
              <label className="form-control">
                <span className="label-text font-semibold text-gray-200 flex items-center gap-2">
                  <Github size={16} /> GitHub Profile
                </span>
                <input
                  className="input input-bordered bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-pink-500"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                />
              </label>
            </div>
          )}

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="btn btn-primary w-full mt-10 font-semibold text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 border-none shadow-lg"
            onClick={saveProfile}
          >
            <Save size={18} /> Save Profile
          </motion.button>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full lg:w-1/2 rounded-3xl shadow-2xl border border-gray-700/50 p-6 flex items-center justify-center"
        >
          <div className="w-full max-w-sm">
            <UserCard
              user={{ firstName, lastName, photoUrl, age, gender, about, skills, githubUrl }}
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
            <div className="alert alert-success shadow-lg bg-green-600 text-white rounded-xl px-6 py-3">
              <span>✅ Profile saved successfully.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditProfile;
