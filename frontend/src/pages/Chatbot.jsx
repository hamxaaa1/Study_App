import { useState, useRef, useEffect } from "react";
import axios from "../api/axiosConfig";
import "./Chatbot.css";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendQuestion = async () => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const userMsg = { type: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post("/chatbot", { question: trimmed });

      const botText =
        response?.data?.answer?.trim() || "Sorry, I couldn't understand that.";
      const botMsg = { type: "bot", text: botText };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            err.response?.data?.message ||
            "Something went wrong while talking to AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !loading) sendQuestion();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-container">
      <h2>Ask AI 🤖</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleEnter}
          disabled={loading}
        />
        <button
          onClick={sendQuestion}
          disabled={loading || !question.trim()}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
