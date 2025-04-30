const API_URL = process.env.REACT_APP_API_URL;

export const getTodos = async () => {
  try {
    const response = await fetch(`${API_URL}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const addTodo = async (text) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, completed: false }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};