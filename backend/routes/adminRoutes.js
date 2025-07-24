const express = require('express');
const { getAllUsers, deleteUser, getAllNotes, deleteNote, getDashboardStats } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

router.get('/notes', authMiddleware, adminMiddleware, getAllNotes);
router.delete('/notes/:id', authMiddleware, adminMiddleware, deleteNote);

router.get('/stats', authMiddleware, adminMiddleware, getDashboardStats);

module.exports = router;
