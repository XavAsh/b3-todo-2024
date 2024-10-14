import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');
  const [newTodoDate, setNewTodoDate] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [orderBy, setOrderBy] = useState('asc');

  const handleAddTodo = () => {
    if (newTodo.trim() && newTodoDate) {
      setTodos([...todos, { id: Date.now(), text: newTodo, date: newTodoDate }]);
      setNewTodo('');
      setNewTodoDate('');
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

  const handleToggleOrderBy = () => {
    setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !completedTodos.includes(todo.id);
    if (filter === 'completed') return completedTodos.includes(todo.id);
    return true;
  }).filter(todo => {
    if (!filterDate) return true;
    return todo.date === filterDate;
  }).sort((a, b) => {
    if (orderBy === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <div className="container">
      <div className="input-bar">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          className="input"
        />
        <input
          type="date"
          value={newTodoDate}
          onChange={(e) => setNewTodoDate(e.target.value)}
          className="input"
        />
        <button onClick={handleAddTodo} className="button button-add">Add</button>
      </div>
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
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="input"
        />
        <button onClick={handleToggleOrderBy} className="button button-order">
          <i className={`fas fa-sort-${orderBy === 'asc' ? 'up' : 'down'}`}></i>
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
                {todo.text} - {todo.date}
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