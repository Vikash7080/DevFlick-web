import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
     // console.log(res.data);
      dispatch(addUser(res.data));//dispatch data into redux store
   return navigate("/");
   
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <div className="bg-[#1A1C23] p-10 rounded-xl shadow-2xl w-full max-w-md sm:max-w-sm">
        <h2 className="text-4xl font-bold text-center mb-6 text-cyan-400">Welcome Back</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-6"
        >
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              placeholder=" "
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="peer w-full px-4 py-3 bg-[#2A2D38] text-white rounded-md border border-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-transparent transition duration-300"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-sm text-gray-400 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-[-10px] peer-focus:text-xs 
              peer-valid:top-[-10px] peer-valid:text-xs 
              peer-focus:text-cyan-400 peer-valid:text-cyan-400 
              bg-[#1A1C23] px-1"
            >
              Email ID
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              id="password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 py-3 bg-[#2A2D38] text-white rounded-md border border-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-transparent transition duration-300"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-sm text-gray-400 transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
              peer-focus:top-[-10px] peer-focus:text-xs 
              peer-valid:top-[-10px] peer-valid:text-xs 
              peer-focus:text-cyan-400 peer-valid:text-cyan-400 
              bg-[#1A1C23] px-1"
            >
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg shadow-md transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          New to DevFlick?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
