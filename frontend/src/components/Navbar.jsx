import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
        {user && !loading && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
      </div>

      <div className="navbar-right">
        {!loading && (
          !user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-button">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          )
        )}
      </div>
    </nav>
  );
}
