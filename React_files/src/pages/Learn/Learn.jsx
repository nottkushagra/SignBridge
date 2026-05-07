import { useState } from "react";
import { Link } from "react-router-dom";
import "./Learn.css";

function Learn() {

  // track which letters user has practiced
  const [done, setDone] = useState([]);

  // all 26 letters
  const letters = [
    "A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T",
    "U","V","W","X","Y","Z"
  ];

  // mark letter as done or not done
  function handleLetterClick(letter) {
    if (done.includes(letter)) {
      setDone(done.filter((l) => l !== letter));
    } else {
      setDone([...done, letter]);
    }
  }

  // daily word feature
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

  // quiz feature - multiple questions
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

  // handle when user picks a quiz answer
  function handleQuizAnswer(optionIndex) {
    if (selectedAnswer !== null) return; // already answered
    setSelectedAnswer(optionIndex);
    if (optionIndex === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  }

  // go to next question
  function nextQuestion() {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizDone(true);
    }
  }

  // restart quiz
  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizDone(false);
  }

  // youtube tutorial videos - real ASL content
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

      {/* Top Section */}
      <div className="learn-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Learn Sign Language</h1>
        <p>
          Start with the basics and build your way up. Click on letters
          below to mark them as practiced!
        </p>
      </div>

      {/* Categories */}
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
              className={done.includes(letter) ? "letter-btn done" : "letter-btn"}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
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

      {/* Daily Word */}
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

      {/* Quiz Section */}
      <div className="learn-section">
        <h2>🧠 Quick Quiz</h2>
        <p className="section-subtitle">
          Test what you've learned! {quizQuestions.length} questions.
        </p>

        <div className="quiz-box">
          {quizDone ? (
            // show score when quiz is finished
            <div className="quiz-result">
              <span className="quiz-result-emoji">
                {score >= 4 ? "🎉" : score >= 2 ? "👍" : "💪"}
              </span>
              <h3>Quiz Complete!</h3>
              <p className="quiz-score">
                You got {score} out of {quizQuestions.length} correct
              </p>
              <button className="daily-word-btn" onClick={restartQuiz}>
                Try Again
              </button>
            </div>
          ) : (
            // show current question
            <>
              <p className="quiz-counter">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
              <p className="quiz-question">
                {quizQuestions[currentQuestion].question}
              </p>
              <div className="quiz-options">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  // figure out button style based on answer
                  let btnClass = "quiz-option";
                  if (selectedAnswer !== null) {
                    if (index === quizQuestions[currentQuestion].answer) {
                      btnClass = "quiz-option correct";
                    } else if (index === selectedAnswer) {
                      btnClass = "quiz-option wrong";
                    }
                  }
                  return (
                    <button
                      key={index}
                      className={btnClass}
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {selectedAnswer !== null && (
                <button className="daily-word-btn" onClick={nextQuestion}>
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
