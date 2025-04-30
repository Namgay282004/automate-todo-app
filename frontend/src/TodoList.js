import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onRefresh }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onRefresh={onRefresh} />
      ))}
    </ul>
  );
}

export default TodoList;
