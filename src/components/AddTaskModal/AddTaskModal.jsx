import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Authprovider/Authprovider";
import { FaTimes } from "react-icons/fa";

const AddTaskModal = ({ refetchTasks }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      timestamp: new Date().toISOString(),
      email: user?.email,
    };

    try {
      const response = await fetch(
        "https://task-manager-server-ten-theta.vercel.app/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        }
      );

      if (!response.ok) throw new Error("Failed to add task");

      console.log("Task added successfully");
      reset();
      document.getElementById("my_modal_1").close();
      refetchTasks(); // 🟢 Refetch tasks after adding
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative">
          {/* Close button */}
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_1").close()}
          >
            <FaTimes />
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <div className="py-2">Title</div>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered"
                {...register("title", {
                  required: "Title is required",
                  maxLength: {
                    value: 50,
                    message: "Title must be less than 50 characters",
                  },
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="form-control">
              <div className="py-2">Description</div>
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered"
                {...register("description", {
                  maxLength: {
                    value: 200,
                    message: "Description must be less than 200 characters",
                  },
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
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
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="bg-gradient-to-r from-[#007bff] to-[#007bff] px-8 py-3 rounded-full cursor-pointer text-white text-[16px] font-medium">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddTaskModal;