import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await axios.post(`${API}/todos`, { title });
    setTitle('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
