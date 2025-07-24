const Comment = require('../models/commentModel');

// ✅ Add Comment
const addComment = async (req, res) => {
    const { noteId, comment } = req.body;
    if (!comment) return res.status(400).json({ message: "Comment is required" });

    const newComment = await Comment.create({
        noteId,
        userId: req.user.userId,
        comment
    });

    res.status(201).json(newComment);
};

// ✅ Get Comments with role and email populated
const getComments = async (req, res) => {
    const { noteId } = req.params;
    const comments = await Comment.find({ noteId })
        .populate('userId', 'email role')  // ✅ Added role here
        .sort({ createdAt: -1 });

    res.status(200).json(comments);
};

// ✅ Delete Comment: student can delete own, admin can delete all
const deleteComment = async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted" });
};


module.exports = { addComment, getComments, deleteComment };
