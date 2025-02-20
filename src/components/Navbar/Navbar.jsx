import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const Links = (
    <>
      <NavLink className="font-semibold">Home</NavLink>
      <NavLink className="btn">Login</NavLink>
    </>
  );
  return (
    <div className="bg-gray-200 px-10">
      <div className="navbar">
        <div className="flex-1">
          <h2 className="text-xl font-bold">PlanPilot</h2>
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
