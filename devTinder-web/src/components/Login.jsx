import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import BlurText from "../components/BlurText";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

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
      setTimeout(() => navigate("/feed"), 1000);
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

  const handleSwitchMode = (mode) => {
    setIsLogin(mode);
    clearForm();
    setFadeKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      <ToastContainer />

      {/* Left Image + Text */}
      <div
        key={fadeKey}
        className="md:w-1/2 relative hidden md:flex flex-col justify-center transition-opacity duration-700 ease-in-out"
      >
        <img
          src="https://t4.ftcdn.net/jpg/02/67/52/49/360_F_267524919_wXbVQHR189pLVU06eQ85GGLnJMq2eJFR.jpg"
          alt="background"
          className="w-full h-full object-cover brightness-[.6]"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute z-10 px-6 lg:px-16 top-1/4 transform -translate-y-1/4">
          <BlurText
            text="👋 Welcome to DevFlick"
            animateBy="words"
            className="text-white text-3xl lg:text-5xl font-bold mb-4"
            delay={100}
          />
          <BlurText
            text="Connect with developers. Share code. Build products. Empower innovation."
            animateBy="words"
            className="text-gray-300 text-md lg:text-xl mb-4"
            delay={80}
          />
          <BlurText
            text="Let’s craft your destiny with logic, passion, and precision."
            animateBy="words"
            className="text-gray-400 text-base lg:text-lg"
            delay={80}
          />
        </div>
      </div>

      {/* Right Form */}
      <div
        key={fadeKey + 1000}
        className="md:w-1/2 w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#0f0f10] z-10"
      >
        <div className="w-full max-w-md bg-[#1a1c23] p-6 sm:p-10 rounded-xl shadow-xl border border-gray-700">
          <div className="flex flex-col items-center mb-6">
            <div className="text-5xl mb-2 text-red-500 animate-pulse">🔥</div>
            <h1 className="text-2xl font-bold">👨‍💻 DevFlick</h1>
            <p className="text-gray-400 mt-1 text-center">Swipe. Match. Code.</p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-around mb-6 border-b border-gray-600">
            <button
              type="button"
              className={`cursor-pointer py-2 px-4 font-semibold transition ${
                isLogin
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-blue-300"
              }`}
              onClick={() => handleSwitchMode(true)}
            >
              Login
            </button>
            <button
              type="button"
              className={`cursor-pointer py-2 px-4 font-semibold transition ${
                !isLogin
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-blue-300"
              }`}
              onClick={() => handleSwitchMode(false)}
            >
              Signup
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isLogin ? handleLogin() : handleSignUp();
            }}
            className="space-y-4"
          >
            {!isLogin && (
              <>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full pl-10 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full pl-10 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 rounded-md bg-[#2A2D38] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            {isLogin && (
              <div className="text-right text-sm text-blue-400 hover:underline cursor-pointer">
                Forgot password?
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-md font-bold text-lg shadow-md transition duration-300"
            >
              {isLogin ? "Log in" : "Sign Up"}
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-sm text-center mt-4 text-gray-400">
            {isLogin ? "New to DevFlick?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="inline-block cursor-pointer text-blue-400 hover:underline focus:outline-none"
              onClick={() => handleSwitchMode(!isLogin)}
            >
              {isLogin ? "Create an account" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
