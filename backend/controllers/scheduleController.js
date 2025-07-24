const Schedule = require("../models/scheduleModel");

// Simple AI schedule logic (you can enhance later with GPT if desired)
exports.generateSchedule = async (req, res) => {
  try {
    const { subjects, dailyHours, examDate } = req.body;

    const subjectList = subjects.join(", ");
    const schedulePlan = `
For the next ${dailyHours} hours/day until ${examDate}, focus on:
- Daily time split among: ${subjectList}
- Use first half for understanding concepts, second half for practice & revision
- Weekly recap every Sunday, increase practice 2 weeks before exam.
        `;

    const newSchedule = await Schedule.create({
      student: req.user.userId,
      subjects,
      dailyHours,
      examDate,
      schedulePlan,
    });

    res
      .status(201)
      .json({ message: "Schedule Generated!", schedule: newSchedule });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate schedule", error: err.message });
  }
};

// Get user schedules
// Get Schedules (Fixed: populate role to identify admin/student on frontend)
exports.getSchedules = async (req, res) => {
  try {
    let schedules;
    if (req.user.role === 'admin') {
      schedules = await Schedule.find().populate("student", "name email role");
    } else {
      schedules = await Schedule.find({ student: req.user.userId }).populate("student", "name email role");
    }
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch schedules", error: err.message });
  }
};




// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ message: "Not found" });

    if (
      req.user.role !== 'admin' &&
      schedule.student.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await schedule.deleteOne();
    res.status(200).json({ message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

