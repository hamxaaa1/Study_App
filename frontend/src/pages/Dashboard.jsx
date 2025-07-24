import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`/notes?mine=true`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setNotes(res.data);
    } catch {
      toast.error("Failed to load notes");
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`/schedules?mine=true`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setSchedules(res.data);
    } catch {
      toast.error("Failed to load schedules");
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchSchedules();
  }, []);

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await axios.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Note deleted");
      fetchNotes();
    } catch {
      toast.error("Note delete failed");
    }
  };

  const deleteSchedule = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;
    try {
      await axios.delete(`/schedules/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Schedule deleted");
      fetchSchedules();
    } catch {
      toast.error("Schedule delete failed");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Dashboard ({user?.role})</h2>

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <h3 className="dashboard-subtitle">📝 My Notes</h3>
          {notes.length === 0 ? (
            <p className="dashboard-empty">No notes found.</p>
          ) : (
            notes.map(note => (
              <div key={note._id} className="dashboard-item">
                <h4>{note.title} ({note.subject})</h4>
                <p>{note.summary}</p>
                <div className="dashboard-buttons">
                  <button onClick={() => deleteNote(note._id)} className="delete-btn">Delete</button>
                  <button onClick={() => navigate(`/notes/edit/${note._id}`)} className="edit-btn">Edit</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="dashboard-column">
          <h3 className="dashboard-subtitle">📅 My Schedules</h3>
          {schedules.length === 0 ? (
            <p className="dashboard-empty">No schedules found.</p>
          ) : (
            schedules.map(schedule => (
              <div key={schedule._id} className="dashboard-item">
                <p><b>Subjects:</b> {schedule.subjects.join(", ")}</p>
                <p><b>Exam Date:</b> {schedule.examDate}</p>
                <p><b>Daily Hours:</b> {schedule.dailyHours}</p>
                <p>{schedule.schedulePlan}</p>
                <div className="dashboard-buttons">
                  <button onClick={() => deleteSchedule(schedule._id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
