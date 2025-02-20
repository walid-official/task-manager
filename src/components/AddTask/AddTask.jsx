import React from "react";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import Tasks from "./../Tasks/Tasks";

const AddTask = () => {
  const handleAddTaskModal = () => {
    document.getElementById("my_modal_1").showModal();
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="flex justify-center">
        <button onClick={handleAddTaskModal} className="btn">
          Add Task +
        </button>
      </div>
      <AddTaskModal></AddTaskModal>
      <div className="mt-10">
        <Tasks></Tasks>
      </div>
    </div>
  );
};

export default AddTask;
