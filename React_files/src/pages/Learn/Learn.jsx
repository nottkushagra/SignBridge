import { useState } from "react";
import { Link } from "react-router-dom";
import "./Learn.css";

// ASL University course data from Lifeprint.com
const aslCourses = [
  {
    level: "ASL 1",
    title: "Introduction to ASL",
    emoji: "🟢",
    description: "Basic grammar, vocabulary, fingerspelling, numbers, and cultural information related to the Deaf Community.",
    lessons: Array.from({ length: 15 }, (_, i) => ({
      number: i + 1,
      url: `https://www.lifeprint.com/asl101/lessons/lesson${String(i + 1).padStart(2, "0")}.htm`,
    })),
  },
  {
    level: "ASL 2",
    title: "Intermediate ASL",
    emoji: "🔵",
    description: "Continuation of ASL 1 — further development of expressive and receptive skills, grammar, vocabulary, and cultural awareness.",
    lessons: Array.from({ length: 15 }, (_, i) => ({
      number: i + 16,
      url: `https://www.lifeprint.com/asl101/lessons/lesson${i + 16}.htm`,
    })),
  },
  {
    level: "ASL 3",
    title: "Advanced Foundations",
    emoji: "🟣",
    description: "Continuation of ASL 2 — advanced expressive and receptive skills, grammar, vocabulary, and cultural awareness.",
    lessons: Array.from({ length: 15 }, (_, i) => ({
      number: i + 31,
      url: `https://www.lifeprint.com/asl101/lessons/lesson${i + 31}.htm`,
    })),
  },
  {
    level: "ASL 4",
    title: "Advanced ASL",
    emoji: "🔴",
    description: "Continuation of ASL 3 — mastery-level development of expressive and receptive skills, grammar, and related terminology.",
    lessons: Array.from({ length: 15 }, (_, i) => ({
      number: i + 46,
      url: `https://www.lifeprint.com/asl101/lessons/lesson${i + 46}.htm`,
    })),
  },
];

// Import all ASL sign images
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

function Learn() {
  const [done, setDone] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const letters = [
    "A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z"
  ];

  function handleLetterClick(letter) {
    setActiveLetter(letter);
    if (!done.includes(letter)) {
      setDone([...done, letter]);
    }
  }

  function closeSignModal() {
    setActiveLetter(null);
  }

  // Daily word
  const words = [
    { word: "Hello", emoji: "👋" },
    { word: "Thank You", emoji: "🙏" },
    { word: "Please", emoji: "🤲" },
    { word: "Sorry", emoji: "😔" },
    { word: "Yes", emoji: "✅" },
    { word: "No", emoji: "❌" },
    { word: "Help", emoji: "🆘" },
    { word: "Friend", emoji: "🤝" },
  ];
  const [wordIndex, setWordIndex] = useState(0);

  // Quiz
  const quizQuestions = [
    {
      question: "What does this sign mean? 🤟",
      options: ["Goodbye", "I Love You", "Thank You"],
      answer: 1,
    },
    {
      question: "What does a thumbs up mean in sign language? 👍",
      options: ["Good / Yes", "Stop", "Hello"],
      answer: 0,
    },
    {
      question: "Waving your hand is a sign for? 👋",
      options: ["Come here", "Goodbye", "Hello / Hi"],
      answer: 2,
    },
    {
      question: "Touching your chin and moving hand forward means?",
      options: ["Sorry", "Thank You", "Please"],
      answer: 1,
    },
    {
      question: "What does tapping your fingers together mean? 🤏",
      options: ["More", "Less", "Stop"],
      answer: 0,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  function handleQuizAnswer(optionIndex) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizDone(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizDone(false);
  }

  // Tutorials
  const tutorials = [
    {
      title: "ASL Alphabet (A-Z)",
      videoId: "tkMg8g8vVUo",
      description: "Learn all 26 letters of the ASL alphabet step by step.",
    },
    {
      title: "25 Basic ASL Signs for Beginners",
      videoId: "v1desDduz5M",
      description: "Common everyday signs you should learn first.",
    },
    {
      title: "ASL Numbers 1-20",
      videoId: "V-Y2bz7oSNQ",
      description: "Learn to count from 1 to 20 in sign language.",
    },
    {
      title: "Common ASL Phrases",
      videoId: "0FcwzMq4iWg",
      description: "Useful phrases like Thank You, Sorry, and more.",
    },
  ];

  return (
    <div className="learn-page">

      {/* Hero Section */}
      <div className="learn-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Learn Sign Language</h1>
        <p>
          Explore foundational sign language vocabulary, interactive alphabet practice,
          and structured ASL lessons.
        </p>
      </div>

      {/* Categories */}
      <div className="learn-section">
        <h2>Categories</h2>
        <p className="section-subtitle">Core vocabulary domains to build your fluency</p>
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

      {/* ASL University Courses */}
      <div className="learn-section">
        <h2>📚 ASL University Courses</h2>
        <p className="section-subtitle">
          Structured courses from ASL University (Lifeprint.com) — from beginner to advanced.
        </p>
        <div className="courses-grid">
          {aslCourses.map((course, index) => (
            <div className="course-card" key={index}>
              <div
                className="course-header"
                onClick={() =>
                  setExpandedCourse(expandedCourse === index ? null : index)
                }
              >
                <div className="course-header-left">
                  <span className="course-emoji">{course.emoji}</span>
                  <div>
                    <span className="course-level">{course.level}</span>
                    <h3>{course.title}</h3>
                  </div>
                </div>
                <span
                  className={
                    "course-toggle" +
                    (expandedCourse === index ? " open" : "")
                  }
                >
                  ▾
                </span>
              </div>
              <p className="course-desc">{course.description}</p>
              {expandedCourse === index && (
                <div className="course-lessons">
                  {course.lessons.map((lesson) => (
                    <a
                      key={lesson.number}
                      href={lesson.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lesson-link"
                    >
                      Lesson {lesson.number}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alphabet Practice */}
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
              className={
                (done.includes(letter) ? "letter-btn done" : "letter-btn") +
                (activeLetter === letter ? " active" : "")
              }
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Sign Image Modal */}
        {activeLetter && (
          <div className="sign-modal-overlay" onClick={closeSignModal}>
            <div className="sign-modal" onClick={(e) => e.stopPropagation()}>
              <button className="sign-modal-close" onClick={closeSignModal}>
                ×
              </button>
              <div className="sign-modal-content">
                <img
                  src={signImages[activeLetter]}
                  alt={`ASL sign for letter ${activeLetter}`}
                  className="sign-image"
                />
                <h3 className="sign-letter-label">{activeLetter}</h3>
                <p className="sign-description">
                  This is the ASL sign for the letter "{activeLetter}"
                </p>
                <div className="sign-nav-buttons">
                  <button
                    className="sign-nav-btn"
                    onClick={() => {
                      const idx = letters.indexOf(activeLetter);
                      const prev = letters[(idx - 1 + 26) % 26];
                      setActiveLetter(prev);
                      if (!done.includes(prev)) setDone([...done, prev]);
                    }}
                  >
                    ← {letters[(letters.indexOf(activeLetter) - 1 + 26) % 26]}
                  </button>
                  <button
                    className="sign-nav-btn"
                    onClick={() => {
                      const idx = letters.indexOf(activeLetter);
                      const next = letters[(idx + 1) % 26];
                      setActiveLetter(next);
                      if (!done.includes(next)) setDone([...done, next]);
                    }}
                  >
                    {letters[(letters.indexOf(activeLetter) + 1) % 26]} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Tutorials */}
      <div className="learn-section">
        <h2>📺 Video Tutorials</h2>
        <p className="section-subtitle">
          Watch real ASL tutorials from expert instructors on YouTube.
        </p>
        <div className="video-grid">
          {tutorials.map((video, index) => (
            <div className="video-card" key={index}>
              <div className="video-wrapper">
                <iframe
                  src={"https://www.youtube.com/embed/" + video.videoId}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="learn-section">
        <h2>Learning Tips</h2>
        <div className="card-grid">

          <div className="tip-card">
            <h3>Practice Daily</h3>
            <p>Even 10 minutes a day builds muscle memory.</p>
          </div>

          <div className="tip-card">
            <h3>Use a Mirror</h3>
            <p>Watch yourself sign to correct hand shapes.</p>
          </div>

          <div className="tip-card">
            <h3>Learn in Context</h3>
            <p>Try full phrases instead of isolated single words.</p>
          </div>

          <div className="tip-card">
            <h3>Observe Facial Expressions</h3>
            <p>Non-manual cues are essential in ASL grammar.</p>
          </div>

        </div>
      </div>

      {/* Daily Word */}
      <div className="learn-section">
        <h2>Word of the Day</h2>
        <div className="daily-word-box">
          <span className="daily-word-emoji">{words[wordIndex].emoji}</span>
          <h3 className="daily-word-text">{words[wordIndex].word}</h3>
          <p>Try signing this word!</p>
          <button
            className="btn btn-sage"
            onClick={() => setWordIndex((wordIndex + 1) % words.length)}
          >
            Next Word →
          </button>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="learn-section">
        <h2>🧠 Quick Quiz</h2>
        <p className="section-subtitle">
          Test what you've learned! {quizQuestions.length} questions.
        </p>

        <div className="quiz-box">
          {quizDone ? (
            <div className="quiz-result">
              <span className="quiz-result-emoji">
                {score >= 4 ? "🎉" : score >= 2 ? "👍" : "💪"}
              </span>
              <h3>Quiz Complete!</h3>
              <p className="quiz-score">
                You got {score} out of {quizQuestions.length} correct
              </p>
              <button className="btn btn-sage" onClick={restartQuiz}>
                Try Again
              </button>
            </div>
          ) : (
            <>
              <p className="quiz-counter">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
              <p className="quiz-question">
                {quizQuestions[currentQuestion].question}
              </p>
              <div className="quiz-options">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  let btnClass = "quiz-option";
                  let prefix = "";
                  if (selectedAnswer !== null) {
                    if (index === quizQuestions[currentQuestion].answer) {
                      btnClass = "quiz-option correct";
                      prefix = "✓ ";
                    } else if (index === selectedAnswer) {
                      btnClass = "quiz-option wrong";
                      prefix = "✕ ";
                    }
                  }
                  return (
                    <button
                      key={index}
                      className={btnClass}
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {prefix}{option}
                    </button>
                  );
                })}
              </div>
              {selectedAnswer !== null && (
                <button className="btn btn-sage" onClick={nextQuestion}>
                  {currentQuestion + 1 < quizQuestions.length ? "Next Question →" : "See Results"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default Learn;
