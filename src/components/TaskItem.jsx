import React, { useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });
  const [refreshComments, setRefreshComments] = useState(false);

  // Cambia el estado de la tarea dinámicamente
  const toggleStatus = () => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    axios.put(`https://backend-repositorio-tas.onrender.com/tasks/${task.id}`, { status: newStatus })
      .then(() => {
        alert(`La tarea "${task.title}" ahora está "${newStatus}".`);
        task.status = newStatus; // Actualiza localmente el estado
        if (onTaskUpdated) onTaskUpdated();
      })
      .catch(err => console.error("Error al cambiar el estado de la tarea:", err));
  };

  // Maneja la edición de una tarea
  const handleEdit = () => {
    axios.put(`https://backend-repositorio-tas.onrender.com/tasks/${task.id}`, editData)
      .then(() => {
        alert(`Tarea "${editData.title}" actualizada.`);
        setIsEditing(false);
        if (onTaskUpdated) onTaskUpdated();
      })
      .catch(err => console.error("Error actualizando la tarea:", err));
  };

  // Maneja la eliminación de una tarea
  const handleDelete = () => {
    axios.delete(`https://backend-repositorio-tas.onrender.com/tasks/${task.id}`)
      .then(() => {
        alert(`Tarea "${task.title}" eliminada.`);
        if (onTaskDeleted) onTaskDeleted();
      })
      .catch(err => console.error("Error eliminando la tarea:", err));
  };

  // Recarga los comentarios cuando se agregan nuevos
  const reloadComments = () => {
    setRefreshComments(!refreshComments); // Cambia el estado para forzar el recargado de comentarios
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      {isEditing ? (
        <div>
          {/* Modo de edición */}
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          ></textarea>
          <input
            type="email"
            value={editData.assigned_to}
            onChange={(e) => setEditData({ ...editData, assigned_to: e.target.value })}
          />
          <button onClick={handleEdit}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          {/* Vista de tarea */}
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Asignada a: {task.assigned_to}</p>
          <p>Estado: {task.status}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
          <button onClick={toggleStatus}>
            {task.status === "pending" ? "Marcar como Completada" : "Revertir a Pendiente"}
          </button>
        </div>
      )}

      {/* Formularios y lista de comentarios */}
      <CommentForm taskId={task.id} onCommentAdded={reloadComments} />
      <CommentList taskId={task.id} refresh={refreshComments} />
    </div>
  );
};

export default TaskItem;
