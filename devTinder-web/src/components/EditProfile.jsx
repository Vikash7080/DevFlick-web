// src/components/EditProfile.jsx
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
      <div className="flex flex-col lg:flex-row items-center justify-center my-10 gap-8 px-4">
        <div className="card bg-base-300 w-full max-w-md shadow-lg border border-neutral/20">
          <div className="card-body">
            <h2 className="card-title justify-center text-xl font-semibold">Edit Profile</h2>

            <label className="form-control w-full my-2">
              <span className="label-text">First Name:</span>
              <input type="text" className="input input-bordered" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text">Last Name:</span>
              <input type="text" className="input input-bordered" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text">Photo URL:</span>
              <input type="text" className="input input-bordered" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text">Age:</span>
              <input type="number" className="input input-bordered" value={age} onChange={(e) => setAge(e.target.value)} min="0" />
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text">Gender:</span>
              <select className="select select-bordered" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="form-control w-full my-2">
              <span className="label-text">About:</span>
              <textarea className="textarea textarea-bordered" value={about} onChange={(e) => setAbout(e.target.value)} maxLength={200} />
              <span className="text-xs text-gray-500">{about.length}/200</span>
            </label>

            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
