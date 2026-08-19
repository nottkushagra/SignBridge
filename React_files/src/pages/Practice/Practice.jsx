import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TargetIcon, ClockIcon, BrainCircuitIcon, HistoryIcon, BookIcon } from "../../components/Icons/Icons";
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
const practiceWords = ["HELLO", "WORLD", "LEARN", "SIGN", "PEACE", "BRAVE"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Practice() {
  const [mode, setMode] = useState("menu"); 

  // Mode: Identify Letter
  const [currentLetter, setCurrentLetter] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  function startIdentifyLetter() {
    setScore({ correct: 0, total: 0 });
    nextIdentifyLetter();
    setMode("identify-letter");
  }

  function nextIdentifyLetter() {
    const target = letters[Math.floor(Math.random() * letters.length)];
    const others = shuffle(letters.filter(l => l !== target)).slice(0, 3);
    setCurrentLetter(target);
    setOptions(shuffle([target, ...others]));
  }

  function handleIdentifyAnswer(guess) {
    if (guess === currentLetter) {
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
    nextIdentifyLetter();
  }

  return (
    <div className="practice-page">
      <div className="practice-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <div className="hero-pill-badge">
          <TargetIcon size={16} /> Interactive Practice
        </div>
        <h1>Test Your Knowledge</h1>
        <p>Master sign language with active recall and interactive drills.</p>
      </div>

      <div className="practice-container">
        {mode === "menu" && (
          <div className="practice-menu-grid">
            <div className="practice-mode-card" onClick={startIdentifyLetter}>
              <div className="mode-icon icon-ai"><BookIcon size={32} /></div>
              <h3>Identify the Letter</h3>
              <p>See a fingerspelled sign and choose the correct letter.</p>
            </div>
            {/* Additional modes can be added here */}
          </div>
        )}

        {mode === "identify-letter" && (
          <div className="active-mode-container">
            <div className="mode-header">
              <h2>Identify the Letter</h2>
              <span className="score-badge">Score: {score.correct} / {score.total}</span>
            </div>
            
            <div className="visual-prompt-card">
              <img src={signImages[currentLetter]} alt={`ASL sign for ${currentLetter}`} className="practice-sign-visual" />
              <p>What letter is this?</p>
            </div>

            <div className="options-grid">
              {options.map(opt => (
                <button key={opt} className="btn-option" onClick={() => handleIdentifyAnswer(opt)}>
                  {opt}
                </button>
              ))}
            </div>

            <button className="btn btn-outline" onClick={() => setMode("menu")}>End Practice</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Practice;
