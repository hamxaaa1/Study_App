import { useState } from "react";
import axios from "../api/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ScheduleCreate.css";

export default function ScheduleCreate() {
  const [subjects, setSubjects] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [examDate, setExamDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/schedules/generate", {
        subjects: subjects.split(",").map(s => s.trim()),
        dailyHours,
        examDate,
      }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      toast.success("Schedule generated!");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to generate schedule");
    }
  };

  return (
    <div className="schedule-create-container">
      <div className="schedule-create-card">
        <h2 className="schedule-create-heading">Create Study Schedule</h2>
        <form onSubmit={handleSubmit} className="schedule-create-form">
          <input
            className="schedule-input"
            placeholder="Subjects (comma separated)"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            required
          />
          <input
            className="schedule-input"
            placeholder="Daily Study Hours"
            type="number"
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
            required
          />
          <input
            className="schedule-input"
            placeholder="Exam Date"
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            required
          />
          <button type="submit" className="schedule-btn">Generate</button>
        </form>
      </div>
    </div>
  );
}
