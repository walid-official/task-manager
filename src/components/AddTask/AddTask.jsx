import React from "react";
import AddTaskModal from './../AddTaskModal/AddTaskModal';
import Tasks from './../Tasks/Tasks';

const AddTask = () => {
  const tasksRef = React.useRef();

  const handleAddTaskModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const refetchTasks = () => {
    if (tasksRef.current) {
      tasksRef.current.refetchAllTasks();
    }
  };

  return (
    <div className="lg:px-24 md:px-10 px-4 my-10">
      <div className="flex justify-center">
        <button onClick={handleAddTaskModal} className="bg-gradient-to-r from-[#007bff] to-[#007bff] px-8 py-3 rounded-full cursor-pointer text-white text-xl font-medium">
          Add Task +
        </button>
      </div>
      <AddTaskModal refetchTasks={refetchTasks} />
      <div className="mt-10">
        <Tasks ref={tasksRef} />
      </div>
    </div>
  );
};

export default AddTask;
