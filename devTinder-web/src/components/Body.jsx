import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <>
      <NavBar />

      {/* ✅ Show user details here */}
      {userData && (
        <div className="bg-base-200 p-6 m-4 rounded-lg text-center shadow">
          <img
            src={userData.photoUrl}
            alt="User"
            className="w-20 h-20 rounded-full mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-gray-600">{userData.emailId}</p>
          <p className="italic mt-2">{userData.about}</p>
        </div>
      )}

      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
