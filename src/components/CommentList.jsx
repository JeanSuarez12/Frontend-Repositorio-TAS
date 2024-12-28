import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ taskId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`https://backend-repositorio-tas.onrender.com/tasks/${taskId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error("Error al obtener comentarios:", error));
  }, [taskId]);

  return (
    <div>
      <h4>Comentarios</h4>
      {comments.map(comment => (
        <div key={comment.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
          <p><strong>{comment.user}:</strong> {comment.comment}</p>
          <p><small>{new Date(comment.timestamp).toLocaleString()}</small></p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
