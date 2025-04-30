import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function TodoItem({ todo, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleDelete = async () => {
    await axios.delete(`${API}/todos/${todo.id}`);
    onRefresh();
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/todos/${todo.id}`, {
      title: newTitle,
      completed: todo.completed,
    });
    setIsEditing(false);
    onRefresh();
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TodoItem;
