import React, { useState } from "react";

function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const handleSave = (id) => {
    editTask(id, editValue);
    setEditingId(null);
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ margin: "10px 0" }}>
          {editingId === task.id ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleSave(task.id)}>Save</button>
            </>
          ) : (
            <>
              <span
                onClick={() => toggleTask(task.id)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer"
                }}
              >
                {task.title}
              </span>
              <button
                style={{ marginLeft: "10px", color: "blue" }}
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                style={{ marginLeft: "10px", color: "red" }}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;