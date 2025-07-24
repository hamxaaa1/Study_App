import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./NoteEdit.css";

export default function NoteEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`/notes/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setNote(res.data);
            } catch (err) {
                toast.error("Failed to fetch note");
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `/notes/${id}`,
                {
                    title: note.title,
                    description: note.description,
                    subject: note.subject,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            toast.success("Note updated successfully!");
            navigate("/dashboard");
        } catch {
            toast.error("Failed to update note");
        }
    };

    if (loading) return <p className="note-loading">Loading note...</p>;
    if (!note) return <p className="note-loading">Note not found</p>;

    return (
        <div className="note-edit-container">
            <h2 className="note-edit-title">✏️ Edit Note</h2>
            <form onSubmit={handleSubmit} className="note-edit-form">
                <div className="note-edit-group">
                    <label>Title</label>
                    <input
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        required
                    />
                </div>
                <div className="note-edit-group">
                    <label>Description</label>
                    <textarea
                        value={note.description}
                        onChange={(e) => setNote({ ...note, description: e.target.value })}
                        required
                    />
                </div>
                <div className="note-edit-group">
                    <label>Subject</label>
                    <select
                        value={note.subject}
                        onChange={(e) => setNote({ ...note, subject: e.target.value })}
                        required
                    >
                        <option value="Math">Math</option>
                        <option value="English">English</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className="note-edit-btn">✅ Update Note</button>
            </form>
        </div>
    );
}
