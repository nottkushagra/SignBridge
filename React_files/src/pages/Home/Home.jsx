import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  // simple counter using useState
  const [count, setCount] = useState(0);

  // simple list of testimonials
  const testimonials = [
    { name: "Aarav", text: "SignBridge helped me learn sign language so fast!" },
    { name: "Priya", text: "I can now talk to my deaf friend. Thank you!" },
    { name: "Rahul", text: "The alphabet practice is really fun and easy." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Breaking Communication Barriers</h1>
          <p>
            Universal Sign Language Assistant — converting sign language to text,
            speech to text, and text to speech in real time.
          </p>
          <div className="hero-buttons">
            <Link to="/learn" className="btn btn-primary">Start Learning →</Link>
            <a href="#convert" className="btn btn-outline">Try Converter</a>
          </div>
        </div>
        <div className="hero-emoji">
          <span>🤟</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎥</span>
            <h3>Sign → Text</h3>
            <p>Real-time camera detection translates hand gestures into readable text.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🗣️</span>
            <h3>Text → Speech</h3>
            <p>Converts typed or generated text into natural-sounding voice output.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎙️</span>
            <h3>Speech → Text</h3>
            <p>Captures spoken words and converts them into text.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🍽️</span>
            <h3>Restaurant Mode</h3>
            <p>Ordering interface for deaf/mute individuals in restaurants.</p>
          </div>
        </div>
      </section>

      {/* Practice CTA */}
      <section className="practice-cta">
        <h2>Practice & Improve</h2>
        <p>
          Learn sign language at your own pace with interactive exercises
          and real-time feedback.
        </p>
        <Link to="/learn" className="btn btn-primary">Start Practicing</Link>
      </section>

      {/* Converter Section */}
      <section className="converter" id="convert">
        <h2>Live Converter</h2>
        <p>Use your camera or microphone to convert between sign language, text, and speech.</p>
        <div className="converter-box">
          <span>📷</span>
          <p>Camera / converter will appear here</p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-section">
        <h2>Join Our Community</h2>
        <p>See how many people are learning with us!</p>
        <div className="stats-box">
          <p className="stats-number">{count}</p>
          <p>People Interested</p>
          <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
            I'm Interested! 🙋
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What People Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-text">"{item.text}"</p>
              <p className="testimonial-name">— {item.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
