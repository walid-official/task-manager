import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/Authprovider";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import GoogleImg from "../../assets/google.png";
import { ThemeContext } from "../context/ThemeContext";
import navImg from "../../assets/logo.png";
const Navbar = () => {
  const { user, signInWithGoogle, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // 🔄 Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 🟢 Google Login Handler
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        navigate("/add-task");
        const userData = {
          userId: result?.user?.uid,
          email: result?.user?.email,
          name: result?.user?.displayName,
        };
        try {
          axios
            .post(
              "https://task-manager-server-ten-theta.vercel.app/users",
              userData
            )
            .then(({ data }) => {
              console.log(data);
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 🔴 Logout Handler
  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // 📋 Navigation Links
  const Links = (
    <>
      {user && (
        <NavLink
          to="/hero"
          className="font-semibold block sm:flex"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
      )}

      {user && (
        <NavLink
          to="/add-task"
          className="font-semibold block sm:flex"
          onClick={() => setIsMenuOpen(false)}
        >
          Add Task
        </NavLink>
      )}
      {user ? (
        <button
          onClick={handleSignOut}
          className="bg-gradient-to-r from-[#007bff] to-[#007bff] rounded-full px-6 py-2 cursor-pointer text-white font-semibold"
        >
          Sign-out
        </button>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="bg-gradient-to-r from-[#007bff] to-[#007bff] px-6 py-2 rounded-full cursor-pointer flex items-center gap-3 text-white font-semibold"
        >
          <img className="w-10" src={GoogleImg} alt="" />
          Google Login
        </button>
      )}
    </>
  );

  return (
    <div
      className={`lg:px-24 md:px-10 px-4 border-b-gray-500 shadow-lg ${
        theme === "light" ? "" : "dark:bg-gray-900 dark:text-white"
      }`}
    >
      <div className="navbar flex justify-between items-center py-6">
        {/* 🚀 Logo */}
        <div className="flex gap-3 items-center">
          <img className="w-10" src={navImg} alt="" />
          <h2 className="text-2xl font-bold">PlanMate</h2>
        </div>

        {/* 🖥️ Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          {Links}
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
              aria-label="Toggle dark mode"
            />
            {/* Sun Icon */}
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* Moon Icon */}
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* 📱 Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-3 text-2xl cursor-pointer" onClick={toggleMenu}>
          
          <div className="">
            <label className="swap swap-rotate cursor-pointer">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
                aria-label="Toggle dark mode"
              />
              {/* Sun Icon */}
              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              {/* Moon Icon */}
              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          <div className="">{isMenuOpen ? <FaTimes /> : <FaBars />}</div>
        </div>
        
      </div>

      {/* 📲 Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 text-black rounded-md shadow-md py-8 pb-4 space-y-4 space-x-4 px-6">
          {Links}
        </div>
      )}
    </div>
  );
};

export default Navbar;
