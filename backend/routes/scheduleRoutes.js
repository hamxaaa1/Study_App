const express = require('express');
const { generateSchedule, getSchedules, deleteSchedule } = require('../controllers/scheduleController');
const {authMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/generate', authMiddleware, generateSchedule);
router.get('/', authMiddleware, getSchedules);
router.delete('/:id', authMiddleware, deleteSchedule);

module.exports = router;
