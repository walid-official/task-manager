import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    fetchTasks("To Do", setToDoTasks);
    fetchTasks("In Progress", setInProgressTasks);
    fetchTasks("Done", setDoneTasks);
  }, []);

  const fetchTasks = async (category, setTasks) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks?category=${encodeURIComponent(category)}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(`Error fetching ${category} tasks:`, error);
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="flex gap-10 justify-between">
        <div className="bg-gray-200 w-[50%] min-h-[300px]">
          <div className="font-bold text-center text-4xl py-3 border btn flex justify-center">
            To-Do
          </div>
          <ul className="p-4">
            {toDoTasks.map((task) => (
              <li key={task._id} className="p-2 border-b">{task.title}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-200 w-[50%] min-h-[300px]">
          <div className="font-bold text-center text-4xl py-3 border btn flex justify-center">
            In Progress
          </div>
          <ul className="p-4">
            {inProgressTasks.map((task) => (
              <li key={task._id} className="p-2 border-b">{task.title}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center my-10">
        <div className="bg-gray-200 w-[50%] min-h-[300px]">
          <div className="font-bold text-center text-4xl py-3 border btn flex justify-center">
            Done
          </div>
          <ul className="p-4">
            {doneTasks.map((task) => (
              <li key={task._id} className="p-2 border-b">{task.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
