import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";
import CommentSection from "../components/CommentSection";

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  const fetchNote = async () => {
    try {
      const res = await axios.get(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setNote(res.data);
    } catch {
      toast.error("Failed to fetch note");
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>{note.title} ({note.subject})</h2>
      <p>{note.description}</p>
      <p><b>Summary:</b> {note.summary}</p>
      <p><b>Author:</b> {note.author?.name} ({note.author?.role})</p>
      <hr />
      <CommentSection noteId={id} />
    </div>
  );
}