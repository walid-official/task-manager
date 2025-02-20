import React from "react";

const Tasks = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex gap-10 justify-between">
        <div className="bg-gray-200 w-[50%] min-h-[300px]">
          <div className="font-bold text-center text-4xl py-3 border btn flex justify-center">
            To-Do
          </div>
        </div>
        <div className="bg-gray-200 w-[50%] min-h-[300px]">
          <div className="font-bold text-center text-4xl py-3 border btn flex justify-center">
            In Progress
          </div>
        </div>
      </div>
      <div className="flex justify-center my-10">
        <div className="bg-gray-200 w-[50%] min-h-[300px]">
          <div className="font-bold text-center text-4xl py-3 border btn flex justify-center">
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
