import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/Authprovider";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

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
          axios.post("http://localhost:5000/users", userData).then(({ data }) => {
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
      <NavLink to="/hero" className="font-semibold" onClick={() => setIsMenuOpen(false)}>
        Home
      </NavLink>
      {user && (
        <NavLink to="/add-task" className="font-semibold" onClick={() => setIsMenuOpen(false)}>
          Add Task
        </NavLink>
      )}
      {user ? (
        <button onClick={handleSignOut} className="btn">
          Logout
        </button>
      ) : (
        <button onClick={handleGoogleLogin} className="btn">
          Google Login
        </button>
      )}
    </>
  );

  return (
    <div className="bg-gray-200 lg:px-24 px-10 shadow-md">
      <div className="navbar flex justify-between items-center py-4">
        {/* 🚀 Logo */}
        <h2 className="text-2xl font-bold">PlanMate Pro</h2>

        {/* 🖥️ Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">{Links}</div>

        {/* 📱 Mobile Toggle */}
        <div className="lg:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* 📲 Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 rounded-md shadow-md py-4 space-y-4 px-6">
          {Links}
        </div>
      )}
    </div>
  );
};

export default Navbar;
