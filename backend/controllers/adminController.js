const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Schedule = require('../models/scheduleModel');

// Get All Users
const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
};

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
};

// Get All Notes
const getAllNotes = async (req, res) => {
    const notes = await Note.find().populate('author', 'email');
    res.status(200).json(notes);
};

// Delete Note
const deleteNote = async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted" });
};

// Dashboard Stats
const getDashboardStats = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();
    const totalSchedules = await Schedule.countDocuments();

    res.status(200).json({ totalUsers, totalNotes, totalSchedules });
};

module.exports = { getAllUsers, deleteUser, getAllNotes, deleteNote, getDashboardStats };
