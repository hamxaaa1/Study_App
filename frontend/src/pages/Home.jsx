import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Your Complete Study Companion</h1>
          <p className="hero-subtitle">Smart Notes, Study Plans, Chatbot Support & Todo Lists — All in One Place</p>
          <a href="/register" className="hero-button">Get Started Free</a>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Why Choose Student Study App?</h2>
          <p className="about-text">
            Focus on studying, leave the rest to us. From AI notes summarization to personalized schedules, our app empowers students to stay organized and stress-free.
          </p>
          <div className="about-cards">
            <div className="about-card">
              <h5>✅ Organized Learning</h5>
              <p>All your notes, tasks and schedules in one organized dashboard.</p>
            </div>
            <div className="about-card">
              <h5>⚡ Save Time</h5>
              <p>AI-powered summaries cut revision time in half.</p>
            </div>
            <div className="about-card">
              <h5>💬 24/7 Help</h5>
              <p>AI Chatbot to assist you anytime you get stuck.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <h2 className="section-title">How It Works?</h2>
          <div className="how-cards">
            <div className="how-box">
              <h5>📝 Upload Notes</h5>
              <p>Create and upload your study notes quickly.</p>
            </div>
            <div className="how-box">
              <h5>🤖 AI Summarizes</h5>
              <p>Get automatic summaries for quick revision.</p>
            </div>
            <div className="how-box">
              <h5>📅 Plan Your Studies</h5>
              <p>Build personalized schedules based on your goals.</p>
            </div>
            <div className="how-box">
              <h5>💬 Ask AI Doubts</h5>
              <p>AI chatbot answers your questions instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-white">Core Features</h2>
          <div className="features-grid">
            <div className="feature-box">
              <h5>📝 AI Note Summary</h5>
              <p>Generate quick, clear summaries from your notes.</p>
            </div>
            <div className="feature-box">
              <h5>📅 Study Scheduling</h5>
              <p>Smart plans based on your goals and subjects.</p>
            </div>
            <div className="feature-box">
              <h5>💬 AI Chatbot</h5>
              <p>Ask doubts and get instant AI-powered replies.</p>
            </div>
            <div className="feature-box">
              <h5>✅ Personal Todo</h5>
              <p>Stay focused with daily and weekly study goals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container">
          <h2 className="section-title">Student Feedback</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <p>“It’s like having a smart friend reminding me what to study.”</p>
              <h6>- Hina, Computer Science</h6>
            </div>
            <div className="testimonial">
              <p>“Before exams, the AI summary literally saves me hours.”</p>
              <h6>- Asad, Electrical Engineering</h6>
            </div>
            <div className="testimonial">
              <p>“Todo feature keeps me consistent every single week!”</p>
              <h6>- Mehwish, BBA</h6>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet the Team Behind the App</h2>
          <div className="team-grid">
            <div className="team-card">
              <h5>Hamza Ashfaq</h5>
              <p>Lead Developer & Designer</p>
            </div>
            <div className="team-card">
              <h5>AI Assistant</h5>
              <p>Your round-the-clock study buddy</p>
            </div>
            <div className="team-card">
              <h5>You, the Student</h5>
              <p>Your feedback helps us improve every day!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>Join the Smart Study Revolution 🚀</h2>
          <p>Study smarter, stay stress-free, and achieve better results.</p>
          <a href="/register" className="cta-btn">Join Now</a>
        </div>
      </section>

      <footer className="footer">
        <small>© 2025 Student Study App. All rights reserved.</small>
      </footer>
    </div>
  );
}
