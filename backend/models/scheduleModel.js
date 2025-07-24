const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subjects: [String],
    dailyHours: Number,
    examDate: String,
    schedulePlan: String,  // generated schedule summary
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
