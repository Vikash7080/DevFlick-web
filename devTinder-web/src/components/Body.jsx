import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import SmartFeedButton from "./SmartFeedButton";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0f0f10]">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />

      {/* User Card */}
      {userData && (
        <div className="bg-base-200 p-6 m-4 rounded-lg text-center shadow">
          <img
            src={userData.photoUrl || "https://placehold.co/100x100"}
            alt="User"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-gray-600">{userData.emailId}</p>
          {userData.about && <p className="italic mt-2">{userData.about}</p>}
        </div>
      )}

      <Outlet />

      {/* Smart Feed Button */}
      <SmartFeedButton />

      <Footer />
    </div>
  );
};

export default Body;
