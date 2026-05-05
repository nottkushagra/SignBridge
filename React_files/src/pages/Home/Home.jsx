import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <>
      <section id="home" className="hero-section">
        <div className="hero-section__content">
          <h1 className="hero-section__title">
            Breaking <span className="hero-section__highlight">Communication</span> Barriers
          </h1>
          <p className="hero-section__subtitle">
            Universal Sign Language Assistant — converting sign language to text,
            speech to text, and text to speech in real time.
          </p>
          <div className="hero-section__actions">
            <Link to="/learn" className="btn btn--primary">Start Learning →</Link>
            <a href="#convert" className="btn btn--outline">Try Converter</a>
          </div>
        </div>
        <div className="hero-section__visual">
          <span className="hero-section__emoji" aria-hidden="true">🤟</span>
        </div>
      </section>

      <section id="features" className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-card__icon">🎥</span>
            <h3 className="feature-card__title">Sign → Text</h3>
            <p className="feature-card__desc">
              Real-time camera detection translates hand gestures into readable text instantly.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon">🗣️</span>
            <h3 className="feature-card__title">Text → Speech</h3>
            <p className="feature-card__desc">
              Converts typed or generated text into natural-sounding voice output.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon">🎙️</span>
            <h3 className="feature-card__title">Speech → Text</h3>
            <p className="feature-card__desc">
              Captures spoken words and converts them into text for better accessibility.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon">🍽️</span>
            <h3 className="feature-card__title">Restaurant Mode</h3>
            <p className="feature-card__desc">
              Specialised ordering interface for deaf/mute individuals in restaurant settings.
            </p>
          </div>
        </div>
      </section>

      <section id="practice" className="practice-section">
        <div className="practice-section__content">
          <h2 className="section-title">Practice &amp; Improve</h2>
          <p className="practice-section__text">
            Learn sign language at your own pace with interactive exercises,
            quizzes, and real-time feedback powered by computer vision.
          </p>
          <Link to="/learn" className="btn btn--primary">Start Practicing</Link>
        </div>
      </section>

      <section id="convert" className="convert-section">
        <h2 className="section-title">Live Converter</h2>
        <p className="convert-section__text">
          Use your camera or microphone to convert between sign language, text, and speech — all in real time.
        </p>
        <div className="convert-section__placeholder">
          <span className="convert-section__placeholder-icon">📷</span>
          <p>Camera / converter will appear here</p>
        </div>
      </section>
    </>
  )
}
