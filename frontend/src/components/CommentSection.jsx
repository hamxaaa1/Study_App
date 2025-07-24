import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./CommentSection.css";

export default function CommentSection({ noteId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${noteId}`);
      setComments(res.data);
    } catch {
      toast.error("Failed to load comments");
    }
  };

  const handleAdd = async () => {
    if (!comment.trim()) return toast.error("Comment cannot be empty");
    try {
      await axios.post(`/comments`, { noteId, comment }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Comment added");
      setComment("");
      fetchComments();
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete comment?")) return;
    try {
      await axios.delete(`/comments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      toast.success("Comment deleted");
      fetchComments();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [noteId]);

  return (
    <div className="comment-section">
      <h3 className="comment-heading">📝 Comments</h3>

      <textarea
        className="comment-textarea"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      ></textarea>

      <button onClick={handleAdd} className="comment-add-btn">
        Add Comment
      </button>

      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="no-comments">No comments yet</div>
        ) : (
          comments.map(c => (
            <div key={c._id} className="comment-item">
              <p className="comment-text">{c.comment}</p>
              <div className="comment-meta">
                <span className={`badge ${c.userId?.role === 'admin' ? 'badge-admin' : 'badge-student'}`}>
                  {c.userId?.role}
                </span>{" "}
                {c.userId?.email}
              </div>
              {(user?.role === 'admin' || user?._id === c.userId?._id) && (
                <button
                  onClick={() => handleDelete(c._id)}
                  className="comment-delete-btn"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
