import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { title, description, assigned_to: assignedTo };

    // Crear la tarea en el backend
    axios.post("https://backend-repositorio-tas.onrender.com/tasks", newTask)
      .then(response => {
        alert("Tarea creada con éxito");
        setTitle("");
        setDescription("");
        setAssignedTo("");

        // Enviar notificación al microservicio
        axios.post("http://127.0.0.1:5001/notify", {
          email: assignedTo,
          message: `Se te ha asignado la tarea: ${title}`
        })
          .then(() => console.log("Notificación enviada"))
          .catch(err => console.error("Error enviando notificación:", err));
      })
      .catch(err => console.error("Error creando tarea:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="email"
        placeholder="Asignar a (correo)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
      />
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default TaskForm;
