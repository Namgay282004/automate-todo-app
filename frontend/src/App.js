import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const API = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>TODO List</h1>
      <TodoForm onAdd={fetchTodos} />
      <TodoList todos={todos} onRefresh={fetchTodos} />
    </div>
  );
}

export default App;
