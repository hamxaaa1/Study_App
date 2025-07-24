const Note = require('../models/noteModel');
const fetch = require('node-fetch');

exports.createNote = async (req, res) => {
    try {
        const { title, description, subject } = req.body;

        const response = await fetch('https://api-inference.huggingface.co/models/Falconsai/text_summarization', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HF_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: description })
        });

        const result = await response.json();
        console.log(result);  // Debugging response

        let summary = "Summary not available";

        if (Array.isArray(result)) {
            summary = result[0]?.summary_text || summary;
        } else if (result.hasOwnProperty('summary_text')) {
            summary = result.summary_text;
        } else if (result.hasOwnProperty('error')) {
            summary = "Model is loading or quota limit hit, try again.";
        }

        const note = await Note.create({
            title,
            description,
            subject,
            summary,
            author: req.user.userId
        });

        res.status(201).json({ message: "Note created with summarization!", note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to create note", error: error.message });
    }
};





// Get all notes (optionally by subject)
exports.getNotes = async (req, res) => {
    try {
        const { subject, mine } = req.query;
        const filter = {};

        // Dashboard filtering
        if (mine === 'true') {
            // Student: their own notes
            if (req.user.role === "student") {
                filter.author = req.user.userId;
            }
            // Admin: only admin's own notes
            if (req.user.role === "admin") {
                filter.author = req.user.userId;
            }
        }

        // Optional subject filter
        if (subject) filter.subject = subject;

        const notes = await Note.find(filter).populate("author", "name email role");
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch notes", error: err.message });
    }
};

exports.getSingleNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate("author", "name email role");
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch note", error: err.message });
    }
};

// controllers/noteController.js

// Like or Unlike Note
exports.toggleLikeNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        const alreadyLiked = note.likes.includes(userId);

        if (alreadyLiked) {
            // Unlike
            note.likes = note.likes.filter(uid => uid.toString() !== userId);
            await note.save();
            return res.status(200).json({ message: "Note unliked", likesCount: note.likes.length });
        } else {
            // Like
            note.likes.push(userId);
            await note.save();
            return res.status(200).json({ message: "Note liked", likesCount: note.likes.length });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to like/unlike note", error: err.message });
    }
};





exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, subject } = req.body;

        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Allow: admin can edit any note, students only their own
        if (note.author.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        note.title = title || note.title;
        note.description = description || note.description;
        note.subject = subject || note.subject;
        await note.save();

        res.status(200).json({ message: "Note updated", note });
    } catch (err) {
        res.status(500).json({ message: "Failed to update note", error: err.message });
    }
};




// Delete note (author or admin only)
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (note.author.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};
