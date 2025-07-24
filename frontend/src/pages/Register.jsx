import { useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    description: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", form);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading">Create Your Student Account 🎓</h2>
        <p className="register-subtext">Join and manage your study resources easily</p>

        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="register-input" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="register-input" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="register-input" />
          <input type="text" name="image" placeholder="Profile Image URL (optional)" value={form.image} onChange={handleChange} className="register-input" />
          <input type="text" name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} className="register-input" />
          <input type="text" name="address" placeholder="Address (optional)" value={form.address} onChange={handleChange} className="register-input" />
          <input type="text" name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} className="register-input" />

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
