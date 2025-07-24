import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar({ isOpen, closeSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Study Portal</h2>
      </div>
      <div className="sidebar-links">
        <Link to="/dashboard" className="sidebar-link" onClick={closeSidebar}>Dashboard</Link>
        <Link to="/notes" className="sidebar-link" onClick={closeSidebar}>Notes</Link>
        <Link to="/notes/create" className="sidebar-link" onClick={closeSidebar}>Create Note</Link>
        <Link to="/schedules" className="sidebar-link" onClick={closeSidebar}>Schedules</Link>
        <Link to="/schedules/create" className="sidebar-link" onClick={closeSidebar}>Create Schedule</Link>
        <Link to="/todos" className="sidebar-link" onClick={closeSidebar}>Todo</Link>
        <Link to="/chatbot" className="sidebar-link" onClick={closeSidebar}>Chatbot</Link>
      </div>
      <div className="sidebar-footer">
        <button className="sidebar-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
