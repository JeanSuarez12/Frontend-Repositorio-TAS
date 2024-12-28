import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ taskId, onCommentAdded }) => {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://backend-repositorio-tas.onrender.com/tasks/${taskId}/comments`, { user, comment })
      .then(() => {
        alert("Comentario agregado");
        setUser("");
        setComment("");
        if (onCommentAdded) onCommentAdded(); // Notifica al padre para recargar comentarios
      })
      .catch(err => console.error("Error agregando comentario:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Agregar Comentario</h4>
      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <textarea
        placeholder="Comentario"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default CommentForm;
