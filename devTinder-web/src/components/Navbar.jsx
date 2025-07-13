import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user); // Get user from Redux store

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨‍💻 DevFlick</a>
      </div>

      {user && (
        <div className="flex items-center gap-2">
          <div className="form-control text-sm font-medium">
            Welcome, {user.firstName}
          </div>

          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="user"
                  src={user.photoUrl || "https://placehold.co/100x100"} // fallback photo
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
