import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const { user } = useAuth();
  const [groupedNotes, setGroupedNotes] = useState({});
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`/notes${subject ? `?subject=${subject}` : ""}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const groups = {};
      res.data.forEach(note => {
        const author = note.author?.role === "admin" ? "Admin" : note.author?.name || "Unknown";
        if (!groups[author]) groups[author] = [];
        groups[author].push(note);
      });
      setGroupedNotes(groups);
    } catch {
      toast.error("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [subject]);

  const toggleLike = async (noteId, author) => {
    try {
      await axios.put(`/notes/like/${noteId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Liked/unliked successfully");

      // Local state update
      setGroupedNotes(prev => {
        const updated = { ...prev };
        updated[author] = updated[author].map(note => {
          if (note._id === noteId) {
            const isLiked = note.likes.includes(user.userId);
            return {
              ...note,
              likes: isLiked
                ? note.likes.filter(id => id !== user.userId)
                : [...note.likes, user.userId]
            };
          }
          return note;
        });
        return updated;
      });
    } catch {
      toast.error("Like/unlike failed");
    }
  };

  const deleteNote = async (noteId) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await axios.delete(`/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Note deleted");
      fetchNotes();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">📚 Notes Collection</h2>

      <select
        className="form-select mb-4"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">All Subjects</option>
        <option value="Math">Math</option>
        <option value="English">English</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>

      {Object.keys(groupedNotes).length === 0 ? (
        <p className="text-center">No notes found</p>
      ) : (
        <div className="accordion" id="notesAccordion">
          {Object.entries(groupedNotes).map(([author, notes], idx) => (
            <div className="accordion-item" key={author}>
              <h2 className="accordion-header" id={`heading-${idx}`}>
                <button
                  className="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${idx}`}
                >
                  {author === "Admin" && (
                    <span className="badge bg-success me-2">Admin</span>
                  )}
                  {author !== "Admin" && (
                    <span className="badge bg-primary me-2">Student</span>
                  )}
                  {author} ({notes.length} notes)
                </button>
              </h2>
              <div
                id={`collapse-${idx}`}
                className="accordion-collapse collapse"
                data-bs-parent="#notesAccordion"
              >
                <div className="accordion-body">
                  {notes.map(note => (
                    <div key={note._id} className="card mb-3 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">{note.title} <span className="badge bg-secondary ms-2">{note.subject}</span></h5>
                        <p className="card-text">{note.summary}</p>
                        <p className="text-muted small mb-2">
                          By: {note.author?.name} ({note.author?.role})
                        </p>
                        <div className="d-flex align-items-center mb-2">
                          <button
                            className={`btn btn-sm me-2 ${note.likes.includes(user.userId) ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => toggleLike(note._id, author)}
                          >
                            👍 {note.likes.length} {note.likes.includes(user.userId) ? 'Unlike' : 'Like'}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => navigate(`/notes/${note._id}`)}
                          >
                            Comment
                          </button>
                          {user.role === "admin" && note.author?.role === "student" && (
                            <>
                              <button
                                className="btn btn-sm btn-outline-warning me-2"
                                onClick={() => navigate(`/notes/edit/${note._id}`)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteNote(note._id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
