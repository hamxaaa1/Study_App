// models/noteModel.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    summary: { type: String },
    fileUrl: { type: String, default: "" },
    subject: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // ✅ Added Likes Array
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
