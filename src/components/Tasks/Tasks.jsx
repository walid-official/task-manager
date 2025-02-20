import React, { useEffect, useState, forwardRef, useImperativeHandle, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdDelete, MdEdit } from "react-icons/md";
import UpdateModal from "../UpdateModal/UpdateModal";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Tasks = forwardRef((props, ref) => {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [singleTasks, setSingleTasks] = useState([]);
  const {user} = useContext(AuthContext)
  // Fetch tasks based on category
  const fetchTasks = async (category, setTasks) => {
    try {
      const response = await fetch(`http://localhost:5000/categoryTasks?category=${encodeURIComponent(category)}&email=${user?.email}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(`Error fetching ${category} tasks:`, error);
    }
  };

  // Refetch all tasks
  const refetchAllTasks = () => {
    fetchTasks("To Do", setToDoTasks);
    fetchTasks("In Progress", setInProgressTasks);
    fetchTasks("Done", setDoneTasks);
  };

  useEffect(() => {
    refetchAllTasks();
  }, []);

  useImperativeHandle(ref, () => ({
    refetchAllTasks,
  }));

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const lists = {
      "To Do": { tasks: toDoTasks, setTasks: setToDoTasks },
      "In Progress": { tasks: inProgressTasks, setTasks: setInProgressTasks },
      "Done": { tasks: doneTasks, setTasks: setDoneTasks },
    };

    const sourceList = lists[source.droppableId];
    const destList = lists[destination.droppableId];

    const [movedTask] = sourceList.tasks.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      movedTask.category = destination.droppableId;
      updateTaskCategory(movedTask._id, destination.droppableId);
    }

    destList.tasks.splice(destination.index, 0, movedTask);

    sourceList.setTasks([...sourceList.tasks]);
    destList.setTasks([...destList.tasks]);
  };

  // Update task category
  const updateTaskCategory = async (taskId, newCategory) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  // Delete task
  const deleteTask = async (taskId, category) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });

      const listMap = {
        "To Do": [toDoTasks, setToDoTasks],
        "In Progress": [inProgressTasks, setInProgressTasks],
        Done: [doneTasks, setDoneTasks],
      };

      const [tasks, setTasks] = listMap[category];
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Fetch single task for editing
  const handleUpdateTaskModal = async (singleTaskId) => {
    document.getElementById("my_modal_2").showModal();
    try {
      const response = await fetch(`http://localhost:5000/singleTasks/${singleTaskId}`);
      const data = await response.json();
      setSingleTasks({ ...data, singleTaskId });
    } catch (err) {
      console.log("Error fetching single task:", err);
    }
  };

  // Render task list
  const renderTaskList = (tasks, title) => (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-200 min-h-[400px] p-4 rounded-lg"
        >
          <div className="font-bold text-center text-3xl py-2">{title}</div>
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-4 rounded-md bg-white text-black my-3 shadow-md ${snapshot.isDragging ? "bg-blue-100" : ""}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3.5 items-center">
                      <h2 className="text-xl font-semibold">{task.title}</h2>
                      <p className="text-sm text-gray-500">
                        {new Date(task.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="space-x-3">
                      <button
                        onClick={() => handleUpdateTaskModal(task._id)}
                        className="text-xl cursor-pointer"
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-xl cursor-pointer text-red-500"
                        onClick={() => deleteTask(task._id, task.category)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <p className="py-2">{task.description}</p>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="w-11/12 mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-2 gap-6">
          {renderTaskList(toDoTasks, "To Do")}
          {renderTaskList(inProgressTasks, "In Progress")}
          {renderTaskList(doneTasks, "Done")}
        </div>
      </DragDropContext>
      <UpdateModal
        singleTasks={singleTasks}
        refetchTasks={refetchAllTasks}
      />
    </div>
  );
});

export default Tasks;
