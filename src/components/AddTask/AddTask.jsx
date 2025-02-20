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
    <div className="w-11/12 mx-auto my-10">
      <div className="flex justify-center">
        <button onClick={handleAddTaskModal} className="btn">
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
