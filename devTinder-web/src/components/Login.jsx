import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    setEmailId("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      toast.success("Login successful!", { position: "top-center" });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err?.response?.data || "Login failed", {
        position: "top-center",
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      toast.success("Signup successful!", { position: "top-center" });
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      toast.error(err?.response?.data || "Signup failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">
      <ToastContainer />
      <div className="bg-[#1a1c23] text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-around mb-6 border-b border-gray-600">
          <button
            className={`py-2 px-4 font-semibold transition ${
              isLogin ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"
            }`}
            onClick={() => {
              setIsLogin(true);
              clearForm();
            }}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 font-semibold transition ${
              !isLogin ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"
            }`}
            onClick={() => {
              setIsLogin(false);
              clearForm();
            }}
          >
            Sign Up
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            isLogin ? handleLogin() : handleSignUp();
          }}
          className="space-y-4"
        >
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email ID"
            className="w-full px-4 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 py-3 rounded-md font-bold text-lg shadow-md transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          {isLogin ? "New to DevFlick?" : "Already have an account?"}{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create an account" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
