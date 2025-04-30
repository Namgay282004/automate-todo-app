const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// CREATE
app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const newTodo = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.json(newTodo.rows[0]);
});

// READ
app.get('/todos', async (req, res) => {
  const allTodos = await pool.query('SELECT * FROM todos ORDER BY id');
  res.json(allTodos.rows);
});

// UPDATE
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  await pool.query(
    'UPDATE todos SET title = $1, completed = $2 WHERE id = $3',
    [title, completed, id]
  );
  res.json({ message: 'Todo updated' });
});

// DELETE
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  res.json({ message: 'Todo deleted' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
