import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
      const response = await fetch(
        `http://localhost:5000/tasks?category=${encodeURIComponent(category)}`
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(`Error fetching ${category} tasks:`, error);
    }
  };

  // Handle Drag and Drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside any list
    if (!destination) return;

    // If dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Mapping list names to state
    const lists = {
      "To Do": { tasks: toDoTasks, setTasks: setToDoTasks },
      "In Progress": { tasks: inProgressTasks, setTasks: setInProgressTasks },
      "Done": { tasks: doneTasks, setTasks: setDoneTasks },
    };

    // Source and destination lists
    const sourceList = lists[source.droppableId];
    const destList = lists[destination.droppableId];

    // Remove from source
    const [movedTask] = sourceList.tasks.splice(source.index, 1);

    // Update category if moved to another list
    if (source.droppableId !== destination.droppableId) {
      movedTask.category = destination.droppableId;
      // Optional: update on server
      updateTaskCategory(movedTask._id, destination.droppableId);
    }

    // Add to destination
    destList.tasks.splice(destination.index, 0, movedTask);

    // Update states
    sourceList.setTasks([...sourceList.tasks]);
    destList.setTasks([...destList.tasks]);
  };

  // Function to update task category on backend
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

  // Reusable function to render task lists
  const renderTaskList = (tasks, title) => (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-200 w-[30%] min-h-[400px] p-4 rounded-lg"
        >
          <div className="font-bold text-center text-3xl py-2">{title}</div>
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`p-4 rounded-md bg-white text-black my-3 shadow-md ${
                    snapshot.isDragging ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="flex gap-3.5 items-center">
                    <h2 className="text-xl font-semibold">{task.title}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(task.timestamp).toLocaleString()}
                    </p>
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
        <div className="flex justify-between gap-5">
          {renderTaskList(toDoTasks, "To Do")}
          {renderTaskList(inProgressTasks, "In Progress")}
          {renderTaskList(doneTasks, "Done")}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Tasks;
