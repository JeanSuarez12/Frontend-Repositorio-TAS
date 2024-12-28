import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("https://backend-repositorio-tas.onrender.com/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <h2>Tareas</h2>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
