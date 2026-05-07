import { useState } from "react";
import { Link } from "react-router-dom";
import "./Learn.css";

function Learn() {
  // track which letters the user has practiced
  const [done, setDone] = useState([]);

  // list of all letters
  const letters = [
    "A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z"
  ];

  // toggle a letter as done / not done
  function handleLetterClick(letter) {
    if (done.includes(letter)) {
      setDone(done.filter((l) => l !== letter));
    } else {
      setDone([...done, letter]);
    }
  }

  return (
    <div className="learn-page">

      {/* top section */}
      <div className="learn-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Learn Sign Language</h1>
        <p>
          Start with the basics and build your way up. Click on letters
          below to mark them as practiced!
        </p>
      </div>

      {/* categories */}
      <div className="learn-section">
        <h2>Categories</h2>
        <div className="card-grid">

          <div className="card">
            <span className="card-icon">🔤</span>
            <h3>Alphabet (A–Z)</h3>
            <p>Learn each letter in sign language.</p>
          </div>

          <div className="card">
            <span className="card-icon">👋</span>
            <h3>Greetings</h3>
            <p>Hello, Thank you, Please and more.</p>
          </div>

          <div className="card">
            <span className="card-icon">🔢</span>
            <h3>Numbers (0–20)</h3>
            <p>Count in sign language.</p>
          </div>

          <div className="card">
            <span className="card-icon">🍕</span>
            <h3>Food & Drinks</h3>
            <p>Signs for common food items.</p>
          </div>

          <div className="card">
            <span className="card-icon">😊</span>
            <h3>Emotions</h3>
            <p>Express happy, sad, excited and more.</p>
          </div>

          <div className="card">
            <span className="card-icon">❓</span>
            <h3>Questions</h3>
            <p>Ask What, Where, When, Who.</p>
          </div>

        </div>
      </div>

      {/* alphabet practice */}
      <div className="learn-section">
        <h2>Alphabet Practice</h2>
        <p className="progress-text">
          {done.length} / 26 letters completed
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: Math.round((done.length / 26) * 100) + "%" }}
          ></div>
        </div>

        <div className="letter-grid">
          {letters.map((letter) => (
            <button
              key={letter}
              className={done.includes(letter) ? "letter-btn done" : "letter-btn"}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* tips section */}
      <div className="learn-section">
        <h2>Learning Tips</h2>
        <div className="card-grid">

          <div className="tip-card">
            <h3>Practice Daily</h3>
            <p>Even 10 minutes a day builds muscle memory.</p>
          </div>

          <div className="tip-card">
            <h3>Use a Mirror</h3>
            <p>Watch yourself sign to correct mistakes.</p>
          </div>

          <div className="tip-card">
            <h3>Learn in Context</h3>
            <p>Try full phrases instead of single words.</p>
          </div>

          <div className="tip-card">
            <h3>Watch Others</h3>
            <p>Watch videos of people using sign language.</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Learn;
