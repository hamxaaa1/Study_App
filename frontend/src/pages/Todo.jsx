import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/todos', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setTodos(res.data);
    } catch {
      toast.error("Failed to load your todos");
    }
  };

  const handleAdd = async () => {
    if (!task.trim()) return toast.error("Task is required");
    try {
      await axios.post('/todos', { task }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Task added");
      setTask("");
      fetchTodos();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const handleToggle = async (id, isCompleted) => {
    try {
      await axios.put(`/todos/${id}`, { isCompleted: !isCompleted }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchTodos();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Task deleted");
      fetchTodos();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h2 className="todo-heading">📝 My To-Do List</h2>

        <div className="todo-input-section">
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="todo-input"
          />
          <button onClick={handleAdd} className="todo-add-btn">Add</button>
        </div>

        {todos.length === 0 ? (
          <p className="todo-empty">No tasks yet</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo._id}
              className={`todo-item ${todo.isCompleted ? 'completed-task' : ''}`}
            >
              <span>{todo.task}</span>
              <div className="todo-btn-group">
                <button
                  onClick={() => handleToggle(todo._id, todo.isCompleted)}
                  className="todo-toggle-btn"
                >
                  {todo.isCompleted ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="todo-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
