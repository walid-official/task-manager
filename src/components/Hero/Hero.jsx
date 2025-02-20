import React from "react";

const Hero = () => {
  return (
    <div className="bg-base-200">
      <div className="flex justify-between items-center w-11/12 mx-auto min-h-screen">
        <div className="w-[50%]">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">PlanMate Pro</h1>
            <p className="py-6">
              PlanMate Pro is a sleek and intuitive task management app designed
              to help you organize, prioritize, and conquer your daily goals.
              With features like drag-and-drop task reordering, due date
              reminders, and customizable lists, staying productive has never
              been easier
            </p>
          </div>
        </div>
        <div className="w-[50%]">
          <img
            className="w-full"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/organizing-project-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--business-management-task-work-schedule-organising-pack-illustrations-10137608.png?f=webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
