import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id) => {
    if (completedTodos.includes(id)) {
      setCompletedTodos(completedTodos.filter(todoId => todoId !== id));
    } else {
      setCompletedTodos([...completedTodos, id]);
    }
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setCompletedTodos(completedTodos.filter(todoId => todoId !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !completedTodos.includes(todo.id);
    if (filter === 'completed') return completedTodos.includes(todo.id);
    return true;
  });

  return (
    <div className="container">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
        className="input"
      />
      <button onClick={handleAddTodo} className="button">Add</button>
      <div>
        <button onClick={() => setFilter('all')} className="button">All</button>
        <button onClick={() => setFilter('active')} className="button">Active</button>
        <button onClick={() => setFilter('completed')} className="button">Completed</button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span className={`todo-text ${completedTodos.includes(todo.id) ? 'completed' : ''}`}>
              {todo.text}
            </span>
            <button onClick={() => handleToggleComplete(todo.id)} className="button">
              {completedTodos.includes(todo.id) ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleRemoveTodo(todo.id)} className="button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;