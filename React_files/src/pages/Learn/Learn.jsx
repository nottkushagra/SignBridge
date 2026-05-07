import { useState } from "react";
import { Link } from "react-router-dom";
import "./Learn.css";

function Learn() {

  const [done, setDone] = useState([]);

  // daily word feature
  const words = [
    { word: "Hello", emoji: "👋" },
    { word: "Thank You", emoji: "🙏" },
    { word: "Please", emoji: "🤲" },
    { word: "Sorry", emoji: "😔" },
    { word: "Yes", emoji: "✅" },
    { word: "No", emoji: "❌" },
  ];
  const [wordIndex, setWordIndex] = useState(0);

  // simple quiz feature
  const [showAnswer, setShowAnswer] = useState(false);

  // list of all letters
  const letters = [
    "A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z"
  ];

  
  function handleLetterClick(letter) {
    if (done.includes(letter)) {
      setDone(done.filter((l) => l !== letter));
    } else {
      setDone([...done, letter]);
    }
  }

  return (
    <div className="learn-page">


      <div className="learn-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Learn Sign Language</h1>
        <p>
          Start with the basics and build your way up. Click on letters
          below to mark them as practiced!
        </p>
      </div>

    
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

      {/* Daily Word Section */}
      <div className="learn-section">
        <h2>Word of the Day</h2>
        <div className="daily-word-box">
          <span className="daily-word-emoji">{words[wordIndex].emoji}</span>
          <h3 className="daily-word-text">{words[wordIndex].word}</h3>
          <p>Try signing this word!</p>
          <button
            className="daily-word-btn"
            onClick={() => setWordIndex((wordIndex + 1) % words.length)}
          >
            Next Word →
          </button>
        </div>
      </div>

      {/* Simple Quiz Section */}
      <div className="learn-section">
        <h2>Quick Quiz</h2>
        <div className="quiz-box">
          <p className="quiz-question">What does this sign mean? 🤟</p>
          <div className="quiz-options">
            <button className="quiz-option" onClick={() => setShowAnswer(true)}>A) Goodbye</button>
            <button className="quiz-option" onClick={() => setShowAnswer(true)}>B) I Love You</button>
            <button className="quiz-option" onClick={() => setShowAnswer(true)}>C) Thank You</button>
          </div>
          {showAnswer && (
            <div className="quiz-answer">
              <p>✅ Correct answer: <strong>B) I Love You</strong></p>
              <button className="daily-word-btn" onClick={() => setShowAnswer(false)}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Learn;
