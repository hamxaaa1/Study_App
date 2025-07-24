import { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import './Schedules.css';

export default function Schedules() {
  const { user } = useAuth();
  const [groupedSchedules, setGroupedSchedules] = useState({});
  const [mySchedules, setMySchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`/schedules`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (user.role === "admin") {
        const groups = {};
        res.data.forEach(schedule => {
          const authorRole = schedule.student?.role;
          if (authorRole !== "student") return;

          const student = schedule.student?.name || "Unknown";
          if (!groups[student]) groups[student] = [];
          groups[student].push(schedule);
        });
        setGroupedSchedules(groups);
      } else {
        setMySchedules(res.data);
      }
    } catch {
      toast.error("Failed to load schedules");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const deleteSchedule = async (id, student) => {
    if (!window.confirm("Delete this schedule?")) return;
    try {
      await axios.delete(`/schedules/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Schedule deleted");

      if (user.role === "admin") {
        setGroupedSchedules(prev => {
          const updated = { ...prev };
          updated[student] = updated[student].filter(schedule => schedule._id !== id);
          if (updated[student].length === 0) delete updated[student];
          return updated;
        });
      } else {
        setMySchedules(prev => prev.filter(schedule => schedule._id !== id));
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-heading">📅 Study Schedules</h2>

      {user.role === "admin" ? (
        Object.keys(groupedSchedules).length === 0 ? (
          <p className="no-schedules">No schedules found</p>
        ) : (
          <div className="accordion schedule-accordion" id="scheduleAccordion">
            {Object.entries(groupedSchedules).map(([student, schedules], idx) => (
              <div key={student} className="accordion-item schedule-group">
                <h2 className="accordion-header" id={`heading-${idx}`}>
                  <button
                    className="accordion-button collapsed group-header"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${idx}`}
                  >
                    <span className="student-label">Student</span> {student} ({schedules.length} schedules)
                  </button>
                </h2>
                <div
                  id={`collapse-${idx}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#scheduleAccordion"
                >
                  <div className="accordion-body group-body">
                    {schedules.map(schedule => (
                      <div key={schedule._id} className="schedule-card">
                        <p><b>Subjects:</b> {schedule.subjects.join(", ")}</p>
                        <p><b>Exam Date:</b> {schedule.examDate}</p>
                        <p><b>Daily Hours:</b> {schedule.dailyHours}</p>
                        <p><b>Plan:</b> {schedule.schedulePlan}</p>
                        <button
                          className="delete-btn"
                          onClick={() => deleteSchedule(schedule._id, student)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        mySchedules.length === 0 ? (
          <p className="no-schedules">No schedules found</p>
        ) : (
          mySchedules.map(schedule => (
            <div key={schedule._id} className="schedule-card">
              <p><b>Subjects:</b> {schedule.subjects.join(", ")}</p>
              <p><b>Exam Date:</b> {schedule.examDate}</p>
              <p><b>Daily Hours:</b> {schedule.dailyHours}</p>
              <p><b>Plan:</b> {schedule.schedulePlan}</p>
              <button
                className="delete-btn"
                onClick={() => deleteSchedule(schedule._id)}
              >
                Delete
              </button>
            </div>
          ))
        )
      )}
    </div>
  );
}
