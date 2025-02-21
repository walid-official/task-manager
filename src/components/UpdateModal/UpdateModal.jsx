import axios from "axios";
import React, { useState, useEffect } from "react";

const UpdateModal = ({ singleTasks, refetchTasks }) => {
  const [category, setCategory] = useState(singleTasks.category || "");
  const [title, setTitle] = useState(singleTasks.title || "");
  const [description, setDescription] = useState(singleTasks.description || "");

  // 🟢 Update local state if singleTasks changes
  useEffect(() => {
    setCategory(singleTasks.category || "");
    setTitle(singleTasks.title || "");
    setDescription(singleTasks.description || "");
  }, [singleTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      title,
      description,
      category: category !== "" ? category : singleTasks.category, // ✅ Conditional check
    };

    try {
      const { data } = await axios.patch(
        `https://task-manager-server-ten-theta.vercel.app/updateTasks/${singleTasks.singleTaskId}`,
        updateData
      );
      console.log("✅ Task updated:", data);

      // 🔄 Refetch tasks to reflect the changes
      refetchTasks();

      // ❌ Close the modal after successful update
      document.getElementById("my_modal_2").close();
    } catch (err) {
      console.error("❌ Error updating task:", err);
    }
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h2 className="text-xl font-bold text-center mb-4">Update Task</h2>

          <div className="card">
            <form onSubmit={handleSubmit} className="card-body">
              {/* Title Input */}
              <div className="form-control">
                <div className="py-2 font-semibold">Title</div>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered"
                  name="title"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="form-control">
                <div className="py-2 font-semibold">Description</div>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input input-bordered"
                  name="description"
                  required
                />
              </div>

              {/* Category Selector */}
              <div className="form-control">
                <div className="py-2 font-semibold">Category</div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Update Task
                </button>
              </div>
            </form>
          </div>

          {/* Close Modal Button */}
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

export default UpdateModal;
