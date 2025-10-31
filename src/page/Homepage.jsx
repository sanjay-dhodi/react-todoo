import button from "daisyui/components/button";
import React, { useState } from "react";

export default function Homepage() {
  const [inputText, setInputText] = useState("");
  const [taskData, setTaskData] = useState([]);
  // const [updateInput, setUpdateInput] = useState("");

  // form submit handle
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: inputText,
      checked: false,
      isEditing: false,
      tempName: "",
    };

    setTaskData([...taskData, data]);
    setInputText("");
  }

  // input field handle
  function handleInputText(e) {
    setInputText(e.target.value);
  }

  // check box task functionality
  function handleChacked(index) {
    const updatedTask = taskData.map((task, i) =>
      i === index ? { ...task, checked: !task.checked } : task
    );

    setTaskData(updatedTask);
  }

  // delete task
  function handleDelete(index) {
    const updatedTask = taskData.filter((_, i) => i !== index);
    setTaskData(updatedTask);
  }

  // update task
  function handleUpdate(index) {
    const newTaskData = taskData.map((task, i) =>
      i === index ? { ...task, isEditing: !task.isEditing } : task
    );

    // console.log(newTaskData);

    setTaskData(newTaskData);
  }

  // handleUpdateInputBox

  function handleUpdateInputBox(e, index) {
    const updatedData = taskData.map((task, i) =>
      i === index
        ? {
            ...task,
            tempName: e.target.value,
          }
        : task
    );

    setTaskData(updatedData);
  }

  // UpdateSave
  function handleUpdateSave(index) {
    const newTaskData = taskData.map((task, i) =>
      i === index
        ? {
            ...task,
            name: task.tempName,
            isEditing: false,
          }
        : task
    );
    setTaskData(newTaskData);
  }

  // handleUpdateCancel
  function handleUpdateCancel(index) {
    const newTaskData = taskData.map((task, i) =>
      i === index ? { ...task, isEditing: false } : task
    );
    setTaskData(newTaskData);
  }

  return (
    <div className="mx-auto w-fit p-5 card shadow-sm bg-white flex flex-column ">
      <h1 className="font-bold text-2xl text-center mb-5"> React Todoo</h1>

      <form onSubmit={handleSubmit} className="w-fit self-center">
        <div className="join">
          <input
            type="text"
            placeholder="Enter Your Task"
            onChange={handleInputText}
            value={inputText}
            className="input join-item input-sm"
          />
          <button type="submit" className="btn  btn-success btn-sm join-item">
            ADD TASK
          </button>
        </div>
      </form>

      <div className="divider" />

      {/* ####################### table ########################### */}

      {!taskData.length > 0 ? (
        <h1 className="text-center">No Tasks </h1>
      ) : (
        <table className="table ">
          <thead>
            <tr>
              <th></th>
              <th>No</th>

              <th>Task Name</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* ################### table body ######################### */}

          <tbody>
            {taskData.map((task, index) => {
              return (
                <tr key={index} className={task.checked ? "line-through" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleChacked(index)}
                      name=""
                      id=""
                    />
                  </td>
                  <td>{index + 1}</td>

                  {/* update rows when editng is true  */}

                  <td>
                    {task.isEditing ? (
                      <input
                        type="text"
                        className="input input-sm "
                        onChange={(e) => handleUpdateInputBox(e, index)}
                        placeholder={task.name}
                        value={task.tempName}
                      />
                    ) : (
                      task.name
                    )}
                  </td>
                  <td>
                    {task.isEditing ? (
                      <>
                        <button
                          onClick={() => handleUpdateSave(index)}
                          className="btn btn-sm btn-success mr-2"
                        >
                          save
                        </button>
                        <button
                          onClick={() => handleUpdateCancel(index)}
                          className="btn btn-sm "
                        >
                          {" "}
                          cancel
                        </button>
                      </>
                    ) : (
                      //  finish editng block below is else default block

                      <div>
                        <button
                          className="btn btn-error btn-sm mr-2"
                          disabled={task.checked ? true : false}
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning btn-sm"
                          disabled={task.checked ? true : false}
                          onClick={() => {
                            handleUpdate(index);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
