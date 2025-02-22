import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { AuthContext } from "../Authprovider/Authprovider";
import { useNavigate } from "react-router";
import { ThemeContext } from "../context/ThemeContext";
const Hero = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const {theme} = useContext(ThemeContext)
  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        navigate("/add-task");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      
    >
      <div className={`lg:px-24 md:px-10 px-4 ${
        theme === "light"
          ? "backdrop-blur-xl bg-white/30"
          : "dark:bg-gray-900 dark:text-white"
      }`}>
        <div className="flex justify-center items-center min-h-[88vh]">
          <div className="">
            <h1 className="xl:text-7xl lg:text-6xl hero-font md:text-5xl sm:text-4xl text-center text-[32px] font-bold">
              A simple task list <br />
              <span className="relative inline-block">
                to <span className="underline-highlight">manage it all</span>
              </span>
            </h1>
            <div className="pb-10 pt-12">
              <p className="lg:text-[22px] md:text-[20px] lg:w-[55%] md:w-[70%] w-[90%] mx-auto text-center text-gray-400 ">
              This is my app that streamlines task management with To Do, In Progress, and Done boards, featuring drag-and-drop, plus quick update and delete options for efficient workflow control.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleGoogleSignin}
                className="bg-gradient-to-r from-[#007bff] to-[#007bff] px-8 py-3 rounded-full cursor-pointer text-white text-xl font-medium flex gap-2 items-center group transition-all duration-300"
              >
                Get started. It's FREE
                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="text-center text-gray-400 text-[16px] py-3">
              <p>Free Forever. No credit card.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
