import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/Authprovider";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import GoogleImg  from "../../assets/google.png"
const Navbar = () => {
  const { user, signInWithGoogle, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    {
      user &&  <NavLink
      to="/hero"
      className="font-semibold"
      onClick={() => setIsMenuOpen(false)}
    >
      Home
    </NavLink>
    }
     
      {user && (
        <NavLink
          to="/add-task"
          className="font-semibold"
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
    <div className="lg:px-24 md:px-10 px-4 shadow-md">
      <div className="navbar flex justify-between items-center py-6">
        {/* 🚀 Logo */}
        <div className="flex gap-3 items-center">
          <img className="w-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMA1P0eFq3Kbew1XNz6EfhcuJq06vl2gfRWA&s" alt="" />
          <h2 className="text-2xl font-bold">PlanMate</h2>
        </div>

        {/* 🖥️ Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">{Links}</div>

        {/* 📱 Mobile Toggle */}
        <div className="lg:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* 📲 Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 rounded-md shadow-md py-8 mb-4 space-y-4 space-x-4 px-6">
          {Links}
        </div>
      )}
    </div>
  );
};

export default Navbar;
