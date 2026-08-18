import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Practice.css";

// Import sign images
import signA from "../../assets/signs/A.png";
import signB from "../../assets/signs/B.png";
import signC from "../../assets/signs/C.png";
import signD from "../../assets/signs/D.png";
import signE from "../../assets/signs/E.png";
import signF from "../../assets/signs/F.png";
import signG from "../../assets/signs/G.png";
import signH from "../../assets/signs/H.png";
import signI from "../../assets/signs/I.png";
import signJ from "../../assets/signs/J.png";
import signK from "../../assets/signs/K.png";
import signL from "../../assets/signs/L.png";
import signM from "../../assets/signs/M.png";
import signN from "../../assets/signs/N.png";
import signO from "../../assets/signs/O.png";
import signP from "../../assets/signs/P.png";
import signQ from "../../assets/signs/Q.png";
import signR from "../../assets/signs/R.png";
import signS from "../../assets/signs/S.png";
import signT from "../../assets/signs/T.png";
import signU from "../../assets/signs/U.png";
import signV from "../../assets/signs/V.png";
import signW from "../../assets/signs/W.png";
import signX from "../../assets/signs/X.png";
import signY from "../../assets/signs/Y.png";
import signZ from "../../assets/signs/Z.png";

const signImages = {
  A: signA, B: signB, C: signC, D: signD, E: signE,
  F: signF, G: signG, H: signH, I: signI, J: signJ,
  K: signK, L: signL, M: signM, N: signN, O: signO,
  P: signP, Q: signQ, R: signR, S: signS, T: signT,
  U: signU, V: signV, W: signW, X: signX, Y: signY,
  Z: signZ,
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const practiceWords = [
  "HELLO", "WORLD", "FRIEND", "LEARN", "SIGN",
  "HELP", "THANK", "LOVE", "GOOD", "HAPPY",
  "PEACE", "DREAM", "SMILE", "BRAVE", "KIND",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Practice() {
  const [mode, setMode] = useState("menu"); // "menu" | "flashcard" | "speed" | "spell"

  // Flashcard Mode
  const [flashcardQueue, setFlashcardQueue] = useState([]);
  const [flashIndex, setFlashIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashScore, setFlashScore] = useState({ correct: 0, wrong: 0 });
  const [flashGuess, setFlashGuess] = useState("");

  function startFlashcards() {
    setFlashcardQueue(shuffle(letters));
    setFlashIndex(0);
    setFlipped(false);
    setFlashScore({ correct: 0, wrong: 0 });
    setFlashGuess("");
    setMode("flashcard");
  }

  function submitFlashGuess() {
    if (!flashGuess.trim()) return;
    const correct = flashGuess.trim().toUpperCase() === flashcardQueue[flashIndex];
    setFlashScore({
      correct: flashScore.correct + (correct ? 1 : 0),
      wrong: flashScore.wrong + (correct ? 0 : 1),
    });
    setFlipped(true);
  }

  function nextFlashcard() {
    if (flashIndex + 1 < flashcardQueue.length) {
      setFlashIndex(flashIndex + 1);
      setFlipped(false);
      setFlashGuess("");
    } else {
      setMode("flashcard-done");
    }
  }

  // Speed Round
  const [speedQueue, setSpeedQueue] = useState([]);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedTimer, setSpeedTimer] = useState(60);
  const [speedActive, setSpeedActive] = useState(false);
  const speedTimerRef = useRef(null);

  function startSpeedRound() {
    const q = shuffle(letters).concat(shuffle(letters));
    setSpeedQueue(q);
    setSpeedIndex(0);
    setSpeedScore(0);
    setSpeedTimer(60);
    setSpeedActive(true);
    setMode("speed");
  }

  useEffect(() => {
    if (speedActive && speedTimer > 0) {
      speedTimerRef.current = setTimeout(() => setSpeedTimer(speedTimer - 1), 1000);
    }
    if (speedActive && speedTimer === 0) {
      setSpeedActive(false);
      setMode("speed-done");
    }
    return () => clearTimeout(speedTimerRef.current);
  }, [speedActive, speedTimer]);

  function handleSpeedAnswer(letter) {
    if (!speedActive) return;
    if (letter === speedQueue[speedIndex]) {
      setSpeedScore(speedScore + 1);
    }
    if (speedIndex + 1 < speedQueue.length) {
      setSpeedIndex(speedIndex + 1);
    } else {
      setSpeedActive(false);
      setMode("speed-done");
    }
  }

  // Fingerspelling
  const [spellWord, setSpellWord] = useState("");
  const [spellLetterIndex, setSpellLetterIndex] = useState(0);
  const [spellCorrect, setSpellCorrect] = useState(0);
  const [spellWordsDone, setSpellWordsDone] = useState(0);

  function startSpelling() {
    const word = practiceWords[Math.floor(Math.random() * practiceWords.length)];
    setSpellWord(word);
    setSpellLetterIndex(0);
    setSpellCorrect(0);
    setSpellWordsDone(0);
    setMode("spell");
  }

  function handleSpellClick(letter) {
    if (spellLetterIndex >= spellWord.length) return;
    if (letter === spellWord[spellLetterIndex]) {
      setSpellCorrect(spellCorrect + 1);
    }
    if (spellLetterIndex + 1 < spellWord.length) {
      setSpellLetterIndex(spellLetterIndex + 1);
    } else {
      setSpellWordsDone(spellWordsDone + 1);
      if (spellWordsDone + 1 >= 5) {
        setMode("spell-done");
      } else {
        const next = practiceWords[Math.floor(Math.random() * practiceWords.length)];
        setSpellWord(next);
        setSpellLetterIndex(0);
      }
    }
  }

  return (
    <div className="practice-page">
      {/* Hero */}
      <div className="practice-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Practice Mode</h1>
        <p>Sharpen your sign language recall with calming, focused exercises.</p>
      </div>

      {/* Mode Menu */}
      {mode === "menu" && (
        <div className="practice-section">
          <h2>Choose an Exercise</h2>
          <p className="section-subtitle">Select a mode to test and reinforce your signing skills</p>
          <div className="practice-modes">
            <button className="practice-mode-card" onClick={startFlashcards}>
              <div className="mode-icon-wrap icon-brand">
                <span className="mode-icon">🃏</span>
              </div>
              <h3>Flashcards</h3>
              <p>View sign gestures, test your letter recognition, and flip for answers.</p>
            </button>
            <button className="practice-mode-card" onClick={startSpeedRound}>
              <div className="mode-icon-wrap icon-sage">
                <span className="mode-icon">⚡</span>
              </div>
              <h3>Speed Round</h3>
              <p>60-second gentle challenge — how many signs can you quickly identify?</p>
            </button>
            <button className="practice-mode-card" onClick={startSpelling}>
              <div className="mode-icon-wrap icon-ai">
                <span className="mode-icon">🔤</span>
              </div>
              <h3>Fingerspelling</h3>
              <p>Spell common everyday words by tapping the correct sign for each letter.</p>
            </button>
          </div>
        </div>
      )}

      {/* Flashcard Mode */}
      {mode === "flashcard" && (
        <div className="practice-section">
          <div className="practice-top-bar">
            <button className="practice-back-btn" onClick={() => setMode("menu")}>
              ← Back to Menu
            </button>
            <span className="practice-progress">
              Card {flashIndex + 1} of {flashcardQueue.length}
            </span>
            <span className="practice-score-badge">
              ✓ {flashScore.correct} &nbsp; ✕ {flashScore.wrong}
            </span>
          </div>

          <div className="flashcard-area">
            <div className={flipped ? "flashcard flipped" : "flashcard"}>
              <div className="flashcard-front">
                <img
                  src={signImages[flashcardQueue[flashIndex]]}
                  alt="Guess this sign"
                  className="flashcard-img"
                />
                <p className="flashcard-prompt">What letter is represented here?</p>
                <div className="flashcard-input-row">
                  <input
                    type="text"
                    maxLength={1}
                    value={flashGuess}
                    onChange={(e) => setFlashGuess(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && submitFlashGuess()}
                    placeholder="?"
                    className="flashcard-input"
                    autoFocus
                  />
                  <button className="btn btn-sage" onClick={submitFlashGuess}>
                    Check Answer
                  </button>
                </div>
              </div>
              <div className="flashcard-back">
                <span className="flashcard-answer-letter">{flashcardQueue[flashIndex]}</span>
                <p className="flashcard-verdict">
                  {flashGuess.trim().toUpperCase() === flashcardQueue[flashIndex]
                    ? "✓ Correct!"
                    : `✕ You guessed "${flashGuess.toUpperCase()}"`}
                </p>
                <button className="btn btn-primary" onClick={nextFlashcard}>
                  {flashIndex + 1 < flashcardQueue.length ? "Next Card →" : "See Summary"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === "flashcard-done" && (
        <div className="practice-section">
          <div className="practice-result-box">
            <span className="practice-result-emoji">
              {flashScore.correct >= 20 ? "🏆" : flashScore.correct >= 13 ? "👏" : "🌱"}
            </span>
            <h2>Flashcards Completed</h2>
            <p className="practice-result-score">
              You recognized {flashScore.correct} out of {flashcardQueue.length} signs correctly.
            </p>
            <div className="practice-result-actions">
              <button className="btn btn-sage" onClick={startFlashcards}>Practice Again</button>
              <button className="btn btn-outline" onClick={() => setMode("menu")}>Back to Menu</button>
            </div>
          </div>
        </div>
      )}

      {/* Speed Round */}
      {mode === "speed" && (
        <div className="practice-section">
          <div className="practice-top-bar">
            <button className="practice-back-btn" onClick={() => { setSpeedActive(false); setMode("menu"); }}>
              ← Exit
            </button>
            <span className="speed-timer">{speedTimer}s remaining</span>
            <span className="practice-score-badge">Score: {speedScore}</span>
          </div>

          <div className="speed-area">
            <img
              src={signImages[speedQueue[speedIndex]]}
              alt="Identify this sign"
              className="speed-sign-img"
            />
            <p className="speed-prompt">Select the matching letter:</p>
            <div className="speed-options">
              {shuffle(letters).slice(0, 6).concat(
                [speedQueue[speedIndex]].filter(l => !shuffle(letters).slice(0, 6).includes(l))
              ).filter((v, i, a) => a.indexOf(v) === i).slice(0, 6).sort().map((letter) => (
                <button
                  key={letter}
                  className="speed-option-btn"
                  onClick={() => handleSpeedAnswer(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === "speed-done" && (
        <div className="practice-section">
          <div className="practice-result-box">
            <span className="practice-result-emoji">
              {speedScore >= 20 ? "⚡" : speedScore >= 10 ? "✨" : "🌱"}
            </span>
            <h2>Time's Up!</h2>
            <p className="practice-result-score">
              You identified {speedScore} signs accurately in 60 seconds.
            </p>
            <div className="practice-result-actions">
              <button className="btn btn-sage" onClick={startSpeedRound}>Try Again</button>
              <button className="btn btn-outline" onClick={() => setMode("menu")}>Back to Menu</button>
            </div>
          </div>
        </div>
      )}

      {/* Fingerspelling */}
      {mode === "spell" && (
        <div className="practice-section">
          <div className="practice-top-bar">
            <button className="practice-back-btn" onClick={() => setMode("menu")}>
              ← Exit
            </button>
            <span className="practice-progress">Word {spellWordsDone + 1} of 5</span>
            <span className="practice-score-badge">✓ {spellCorrect} letters</span>
          </div>

          <div className="spell-area">
            <h3 className="spell-word">
              {spellWord.split("").map((ch, i) => (
                <span
                  key={i}
                  className={
                    i < spellLetterIndex ? "spell-char done" :
                    i === spellLetterIndex ? "spell-char current" : "spell-char"
                  }
                >
                  {i < spellLetterIndex ? ch : i === spellLetterIndex ? "?" : "•"}
                </span>
              ))}
            </h3>
            <p className="spell-hint">
              Tap the sign for letter: <strong>{spellWord[spellLetterIndex]}</strong>
            </p>
            <div className="spell-grid">
              {letters.map((letter) => (
                <button
                  key={letter}
                  className="spell-sign-btn"
                  onClick={() => handleSpellClick(letter)}
                  aria-label={`Sign for letter ${letter}`}
                >
                  <img src={signImages[letter]} alt={letter} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === "spell-done" && (
        <div className="practice-section">
          <div className="practice-result-box">
            <span className="practice-result-emoji">🎯</span>
            <h2>Spelling Challenge Complete!</h2>
            <p className="practice-result-score">
              You spelled all 5 words with {spellCorrect} letters matched.
            </p>
            <div className="practice-result-actions">
              <button className="btn btn-sage" onClick={startSpelling}>Play Again</button>
              <button className="btn btn-outline" onClick={() => setMode("menu")}>Back to Menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Practice;
