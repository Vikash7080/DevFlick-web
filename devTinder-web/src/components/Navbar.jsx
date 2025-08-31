import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Zap, LogOut, User, Users, Sparkles, Crown, Laptop2 } from "lucide-react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      toast.info("🚪 Logged out successfully", { position: "top-center" });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error("Logout failed. Please try again.", { position: "top-center" });
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="navbar bg-base-300/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        {/* Left: Branding */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 px-2 py-1 group">
            <Zap className="w-7 h-7 text-yellow-400 drop-shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent tracking-tight flex items-center gap-1">
              DevFlick
              <Laptop2 className="w-6 h-6 text-white transition-transform duration-500 group-hover:translate-y-[-2px] group-hover:scale-110" />
            </span>
          </Link>
        </div>

        {/* Right: User Menu */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm font-medium text-gray-300">
              Welcome, <span className="text-white font-semibold">{user.firstName}</span>
            </div>

            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition"
              >
                <div className="w-10 rounded-full ring ring-yellow-400 ring-offset-1 ring-offset-base-300">
                  <img
                    alt="user"
                    src={user.photoUrl || "https://placehold.co/100x100"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-md rounded-xl z-10 mt-3 w-56 p-2 shadow-lg border border-white/10"
              >
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User size={16} /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="flex items-center gap-2">
                    <Users size={16} /> Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="flex items-center gap-2">
                    <Sparkles size={16} /> Requests
                  </Link>
                </li>
                <li>
                  <Link to="/premium" className="flex items-center gap-2">
                    <Crown size={16} className="text-yellow-400" /> Premium
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
