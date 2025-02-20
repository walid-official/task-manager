import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Authprovider/Authprovider";
import axios from "axios";

const Navbar = () => {
  const { user, signInWithGoogle, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
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
          const { data } = axios.post("http://localhost:5000/users", userData);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    userSignOut()
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Links = (
    <>
      <NavLink to="/hero" className="font-semibold">
        Home
      </NavLink>
      {user && (
        <NavLink to="/add-task" className="font-semibold">
          Add Task
        </NavLink>
      )}
      {user ? (
        <NavLink onClick={handleSignOut} className="btn">
          Logout
        </NavLink>
      ) : (
        <NavLink onClick={handleGoogleLogin} className="btn">
          Google Login
        </NavLink>
      )}
    </>
  );
  return (
    <div className="bg-gray-200 px-24">
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
