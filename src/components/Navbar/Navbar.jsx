import React from "react";
import { Link, NavLink } from "react-router";
import { auth } from "../../firebase/firebase.init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Navbar = () => {
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Links = (
    <>
      <NavLink to="/hero" className="font-semibold">
        Home
      </NavLink>
      <NavLink to="/add-task" className="font-semibold">
        Add Task
      </NavLink>
      <NavLink onClick={handleGoogleLogin} className="btn">
        Google Login
      </NavLink>
    </>
  );
  return (
    <div className="bg-gray-200 px-10">
      <div className="navbar">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">PlanPilot</h2>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal space-x-4 items-center px-1">
            {Links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
