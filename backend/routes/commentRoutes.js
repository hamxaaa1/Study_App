const express = require('express');
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addComment);
router.get('/:noteId', getComments);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
