const express = require('express');
const { createNote, getNotes, deleteNote, updateNote, getSingleNote, toggleLikeNote } = require('../controllers/noteController');
const {authMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);
router.delete('/:id', authMiddleware, deleteNote);
router.put('/:id', authMiddleware, updateNote);
router.get('/:id', authMiddleware, getSingleNote);
router.put('/like/:id', authMiddleware, toggleLikeNote);




module.exports = router;
