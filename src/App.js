// Import necessary dependencies from React
import React, { useState } from 'react';

// Import styles for the component
import './App.css';

// Main functional component for the To-Do List application
function App() {
  // State variables using the useState hook
  const [tasks, setTasks] = useState([]); // To store the list of tasks
  const [newTask, setNewTask] = useState(""); // To track the input for adding a new task
  const [filter, setFilter] = useState("all"); // To determine the current filter (all, active, completed)

  // Event handler for input change in the new task input field
  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  // Event handler to add a new task to the list
  function addTask() {
    if (newTask.trim() !== "") {
      // Create a new task object with a unique id, text, and initially set as not completed
      const newTaskItem = { id: Date.now(), text: newTask, completed: false };
      // Update the tasks state by adding the new task
      setTasks([...tasks, newTaskItem]);
      // Clear the new task input field
      setNewTask("");
    }
  }

  // Event handler to toggle the completion status of a task
  function toggleCompletion(id) {
    // Create a new array of tasks with the completion status of the toggled task inverted
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    // Update the tasks state with the modified array
    setTasks(updatedTasks);
  }

  // Filter the tasks based on the selected filter (all, active, completed)
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Render the To-Do List component
  return (
    <div className="App">
      {/* Header for the To-Do List */}
      <h1>To-Do List</h1>

      {/* Input field for adding a new task */}
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add a new task..."
      />

      {/* Button to add the new task */}
      <button onClick={addTask}>Add</button>

      {/* Display the list of tasks */}
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            {/* Checkbox to toggle task completion status */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
            {/* Display the task text */}
            {task.text}
          </li>
        ))}
      </ul>

      {/* Filter buttons to show all, active, or completed tasks */}
      <div>
        Filter:
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;
