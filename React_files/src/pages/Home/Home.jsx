import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
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
    </div>
  );
}

export default Home;
