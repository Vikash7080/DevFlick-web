import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  // agar user login nahi hai, component render hi nahi hoga
  if (!user) return null;

  return <EditProfile user={user} />;
};

export default Profile;
