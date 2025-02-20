import React from "react";

const AddTaskModal = () => {
  return (
    <div className="">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="">
            <div className="card">
              <form className="card-body">
                <div className="form-control">
                  <div className=" py-2">Title</div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <div className="  py-2">Description</div>
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <div className="py-2">Your Category</div>
                  <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>
                      Your Category
                    </option>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Add Task</button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddTaskModal;
