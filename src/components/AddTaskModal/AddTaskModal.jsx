import React from "react";
import { useForm } from "react-hook-form";

const AddTaskModal = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    
    console.log(taskData);
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error("Failed to add task");

      console.log("Task added successfully");
      reset();
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <div className="py-2">Title</div>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered"
                  {...register("title", { required: "Title is required", maxLength: { value: 50, message: "Max 50 characters" } })}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              <div className="form-control">
                <div className="py-2">Description</div>
                <input
                  type="text"
                  placeholder="Description"
                  className="input input-bordered"
                  {...register("description", { maxLength: { value: 200, message: "Max 200 characters" } })}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              <div className="form-control">
                <div className="py-2">Your Category</div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register("category", { required: "Category is required" })}
                >
                  <option value="">Select Category</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Add Task</button>
              </div>
            </form>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddTaskModal;
