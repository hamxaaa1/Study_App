import { useState } from "react";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./NoteCreate.css";

export default function NoteCreate() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !subject)
      return toast.error("Fill all fields");

    try {
      const res = await axios.post(
        "/notes/create",
        { title, description, subject },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create note");
    }
  };

  return (
    <div className="note-create-container">
      <div className="note-create-card">
        <h2 className="note-create-heading">📄 Create Note ({user?.role})</h2>
        <form onSubmit={handleSubmit} className="note-create-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="note-textarea"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="note-input"
          />
          <button type="submit" className="note-submit-btn">Create Note</button>
        </form>
      </div>
    </div>
  );
}
