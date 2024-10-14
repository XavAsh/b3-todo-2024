import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

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

  const handleEditTodo = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleConfirmEdit = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: editTodoText } : todo)));
    setEditTodoId(null);
    setEditTodoText('');
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
      <button onClick={handleAddTodo} className="button button-add">Add</button>
      <div className="filters">
        <button
          onClick={() => setFilter('all')}
          className={`button button-all ${filter === 'all' ? 'button-highlight' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`button button-active ${filter === 'active' ? 'button-highlight' : ''}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`button button-complete ${filter === 'completed' ? 'button-highlight' : ''}`}
        >
          Completed
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editTodoId === todo.id ? (
              <input
                type="text"
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
                className="input"
              />
            ) : (
              <span className={`todo-text ${completedTodos.includes(todo.id) ? 'completed' : ''}`}>
                {todo.text}
              </span>
            )}
            {editTodoId === todo.id ? (
              <button onClick={() => handleConfirmEdit(todo.id)} className="button button-add">Save</button>
            ) : (
              <button onClick={() => handleEditTodo(todo.id, todo.text)} className="button button-edit">Edit</button>
            )}
            <button onClick={() => handleToggleComplete(todo.id)} className="button button-complete">
              {completedTodos.includes(todo.id) ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleRemoveTodo(todo.id)} className="button button-delete"><i className="fas fa-trash"></i> Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;