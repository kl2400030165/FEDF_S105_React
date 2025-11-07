import React, { useState } from "react";
import TaskList from "./components/TaskList";
import tasksData from "./tasks.json"; // import initial tasks

function App() {
  // State: tasks array + new task input
  const [tasks, setTasks] = useState(tasksData);
  const [newTask, setNewTask] = useState("");

  // Create (Add task)
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: newTask,
      completed: false
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask(""); // reset input
  };

  // Update (Toggle completion)
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Update (Edit task title)
  const editTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1> To-Do List-skill8</h1>

      {/* Controlled Form */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Conditional Rendering */}
      {tasks.length === 0 ? (
        <p>No tasks available. Add some tasks</p>
      ) : (
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      )}
    </div>
  );
}

export default App;
