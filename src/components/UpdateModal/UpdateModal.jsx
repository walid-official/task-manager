import axios from "axios";
import React, { useState } from "react";

const UpdateModal = ({ singleTasks }) => {
  console.log(singleTasks);
  const [category, setCategory] = useState(singleTasks.category || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const updateData = {
      title: title,
      description: description,
      category: category !== "" ? category : singleTasks.category, // ✅ Conditional check
    };

    console.log(updateData);
    console.log(singleTasks.singleTaskId);


  try {
    const { data } = await axios.patch(
      `http://localhost:5000/updateTasks/${singleTasks.singleTaskId}`,
      updateData
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }



  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="card">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <div className="py-2">Title</div>
                <input
                  type="text"
                  placeholder="Title"
                  defaultValue={singleTasks.title}
                  className="input input-bordered"
                  name="title"
                />
              </div>

              <div className="form-control">
                <div className="py-2">Description</div>
                <input
                  type="text"
                  placeholder="Description"
                  defaultValue={singleTasks.description}
                  className="input input-bordered"
                  name="description"
                />
              </div>

              <div className="form-control">
                <div className="py-2">Your Category</div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={category} // Set default value here
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Update Task
                </button>
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

export default UpdateModal;
