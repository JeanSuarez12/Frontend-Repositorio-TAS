import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App = () => {
  const [view, setView] = useState("list"); // "list" o "create"

  return (
    <div className="container">
      <h1>Gestión de Tareas</h1>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setView("list")}>Ver Tareas</button>
        <button onClick={() => setView("create")}>Crear Tarea</button>
      </div>
      {view === "list" ? <TaskList /> : <TaskForm />}
    </div>
  );
};

export default App;
