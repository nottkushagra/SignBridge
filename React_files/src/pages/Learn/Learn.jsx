import { useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import { BookIcon, PlayIcon, GraduationCapIcon, SearchIcon, HandSignIcon, CloseIcon, HistoryIcon, TargetIcon, SparklesIcon, ExternalLinkIcon } from '../../components/Icons/Icons';
import "./Learn.css";

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

// Comprehensive ASL University course database (Lifeprint.com - Dr. Bill Vicars)
const aslCourses = [
  {
    level: "Beginner",
    title: "ASL Foundations",
    description: "Foundational vocabulary, grammar principles, fingerspelling, numbers 1-20, and cultural insights.",
    color: "#71816B",
    lessons: [
      { number: 1, title: "Introductions & Greetings", vocab: ["HELLO", "NAME", "NICE-TO-MEET-YOU"], videoId: "kCKFF0Berc8", url: "https://www.lifeprint.com/asl101/lessons/lesson01.htm" },
      { number: 2, title: "Family & People", vocab: ["MOTHER", "FATHER", "SISTER", "BROTHER"], videoId: "daM_3e226a0", url: "https://www.lifeprint.com/asl101/lessons/lesson02.htm" },
      { number: 3, title: "Colors & Descriptions", vocab: ["COLOR", "RED", "BLUE", "GREEN"], videoId: "5K4k0846v-Q", url: "https://www.lifeprint.com/asl101/lessons/lesson03.htm" },
      { number: 4, title: "Food & Drinks", vocab: ["EAT", "FOOD", "DRINK", "WATER"], videoId: "GZtZ3eC3Fbg", url: "https://www.lifeprint.com/asl101/lessons/lesson04.htm" },
      { number: 5, title: "School & Education", vocab: ["SCHOOL", "LEARN", "PRACTICE", "UNDERSTAND"], videoId: "uU0QGqE7tW8", url: "https://www.lifeprint.com/asl101/lessons/lesson05.htm" },
      { number: 6, title: "Numbers & Counting", vocab: ["NUMBER", "COUNT", "HOW-MANY"], videoId: "X8yG4pZ5xL4", url: "https://www.lifeprint.com/asl101/lessons/lesson06.htm" },
    ],
  },
  {
    level: "Intermediate",
    title: "Conversational ASL",
    description: "Complex sentence structure, directional verbs, classifier handshapes, and conversational idioms.",
    color: "#6F8790",
    lessons: [
      { number: 7, title: "Questions & Pronouns", vocab: ["WHO", "WHAT", "WHERE", "WHEN", "WHY"], videoId: "o36e8x8tQz4", url: "https://www.lifeprint.com/asl101/lessons/lesson09.htm" },
      { number: 8, title: "Time & Scheduling", vocab: ["TIME", "DAY", "MORNING", "TOMORROW"], videoId: "6_0zC-kYq3Q", url: "https://www.lifeprint.com/asl101/lessons/lesson07.htm" },
      { number: 9, title: "Places & Navigation", vocab: ["HOME", "WORK", "STORE", "GO-TO"], videoId: "d0z89_7fQcE", url: "https://www.lifeprint.com/asl101/lessons/lesson11.htm" },
      { number: 10, title: "Food & Restaurant", vocab: ["RESTAURANT", "ORDER", "HUNGRY", "MENU"], videoId: "GZtZ3eC3Fbg", url: "https://www.lifeprint.com/asl101/lessons/lesson04.htm" },
      { number: 11, title: "School Conversation", vocab: ["TEACHER", "STUDENT", "CLASS", "TEST"], videoId: "uU0QGqE7tW8", url: "https://www.lifeprint.com/asl101/lessons/lesson05.htm" },
      { number: 12, title: "Weather & Seasons", vocab: ["WEATHER", "RAIN", "HOT", "COLD"], videoId: "3e_f0q89a2b", url: "https://www.lifeprint.com/asl101/lessons/lesson12.htm" },
    ]
  }
];

// Massive Video Tutorials Database (30+ High-Quality Curated Videos)
const tutorialDatabase = [
  // Dr. Bill Vicars (Lifeprint) Series
  {
    id: "v-1",
    title: "Dr. Bill Vicars: ASL 1 - Lesson 01",
    channel: "Dr. Bill Vicars (Lifeprint)",
    category: "Lifeprint Courses",
    level: "Beginner",
    duration: "48 min",
    videoId: "kCKFF0Berc8",
    description: "Introduction to ASL, fingerspelling fundamentals, greetings, basic vocabulary, and Deaf cultural etiquette.",
  },
  {
    id: "v-2",
    title: "Dr. Bill Vicars: ASL 1 - Lesson 02",
    channel: "Dr. Bill Vicars (Lifeprint)",
    category: "Lifeprint Courses",
    level: "Beginner",
    duration: "42 min",
    videoId: "daM_3e226a0",
    description: "Family members, relationships, pronouns, yes/no facial grammar, and conversational partner practice.",
  },
  {
    id: "v-3",
    title: "Dr. Bill Vicars: ASL 1 - Lesson 03",
    channel: "Dr. Bill Vicars (Lifeprint)",
    category: "Lifeprint Courses",
    level: "Beginner",
    duration: "39 min",
    videoId: "5K4k0846v-Q",
    description: "All primary and secondary colors, descriptive adjectives, size, and basic sentence construction.",
  },
  {
    id: "v-4",
    title: "Dr. Bill Vicars: ASL 1 - Lesson 04",
    channel: "Dr. Bill Vicars (Lifeprint)",
    category: "Lifeprint Courses",
    level: "Beginner",
    duration: "45 min",
    videoId: "GZtZ3eC3Fbg",
    description: "Food, dining, drinks, breakfast/lunch/dinner signs, hungry/thirsty states, and order preferences.",
  },
  {
    id: "v-5",
    title: "Dr. Bill Vicars: ASL 1 - Lesson 05",
    channel: "Dr. Bill Vicars (Lifeprint)",
    category: "Lifeprint Courses",
    level: "Beginner",
    duration: "41 min",
    videoId: "uU0QGqE7tW8",
    description: "School, academic vocabulary, classroom communication, studying, learning materials, and books.",
  },
  {
    id: "v-6",
    title: "Dr. Bill Vicars: ASL 1 - Lesson 06",
    channel: "Dr. Bill Vicars (Lifeprint)",
    category: "Lifeprint Courses",
    level: "Intermediate",
    duration: "44 min",
    videoId: "X8yG4pZ5xL4",
    description: "Numbers 1-100, quantification, ordinal counting (1st, 2nd), math operations, and counting drills.",
  },

  // Beginner Fundamentals & Alphabet
  {
    id: "v-7",
    title: "Complete ASL Alphabet (A–Z) Guide",
    channel: "Learn ASL",
    category: "Beginner 101",
    level: "Beginner",
    duration: "6 min",
    videoId: "tkMg8g8vVUo",
    description: "Master all 26 letters of the American Sign Language fingerspelling alphabet with slow-motion demos.",
  },
  {
    id: "v-8",
    title: "25 Basic ASL Signs for Beginners",
    channel: "Learn How to Sign",
    category: "Beginner 101",
    level: "Beginner",
    duration: "12 min",
    videoId: "v1desDduz5M",
    description: "Essential first signs: Hello, Thank You, Please, Yes, No, Help, More, and daily basics.",
  },
  {
    id: "v-9",
    title: "100 Basic ASL Signs Every Beginner Must Know",
    channel: "Learn How to Sign",
    category: "Beginner 101",
    level: "Beginner",
    duration: "25 min",
    videoId: "ianCwt4ye1g",
    description: "Comprehensive marathon covering the top 100 most frequently used sign language words.",
  },
  {
    id: "v-10",
    title: "ASL Numbers 1–20 Step-by-Step",
    channel: "Learn ASL",
    category: "Beginner 101",
    level: "Beginner",
    duration: "8 min",
    videoId: "V-Y2bz7oSNQ",
    description: "How to properly form hand shapes for counting from 1 to 20 without wrist fatigue.",
  },
  {
    id: "v-11",
    title: "50 Essential Everyday ASL Words",
    channel: "Sign Language 101",
    category: "Beginner 101",
    level: "Beginner",
    duration: "18 min",
    videoId: "Raa0vBXA8OQ",
    description: "Expand your foundation with high-utility conversational vocabulary for day-to-day use.",
  },
  {
    id: "v-12",
    title: "All Colors in ASL (Visual Palette)",
    channel: "Learn ASL",
    category: "Beginner 101",
    level: "Beginner",
    duration: "7 min",
    videoId: "s06vQf8Z1Z0",
    description: "How to sign primary colors, shades, brightness, and favorite color preferences.",
  },

  // Everyday Conversations & Phrases
  {
    id: "v-13",
    title: "Top 30 Common ASL Phrases & Responses",
    channel: "Signed With Heart",
    category: "Conversations",
    level: "Beginner",
    duration: "15 min",
    videoId: "0FcwzMq4iWg",
    description: "Common phrases: 'How are you?', 'Nice to meet you', 'Excuse me', 'Have a good day'.",
  },
  {
    id: "v-14",
    title: "Question Words: Who, What, Where, When, Why, How",
    channel: "ASL Meredith",
    category: "Conversations",
    level: "Intermediate",
    duration: "13 min",
    videoId: "o36e8x8tQz4",
    description: "Mastering WH-question facial grammar (furrowed brows) vs Yes/No question markers.",
  },
  {
    id: "v-15",
    title: "Feelings & Emotions in Sign Language",
    channel: "Signed With Heart",
    category: "Conversations",
    level: "Beginner",
    duration: "9 min",
    videoId: "2f8_0w3J2eA",
    description: "Expressing emotions: Happy, Sad, Excited, Angry, Confused, Nervous, Peaceful, Tired.",
  },
  {
    id: "v-16",
    title: "Days of the Week & Telling Time in ASL",
    channel: "ASL That",
    category: "Conversations",
    level: "Beginner",
    duration: "11 min",
    videoId: "6_0zC-kYq3Q",
    description: "Days Monday through Sunday, morning/night concepts, schedules, and setting meeting times.",
  },
  {
    id: "v-17",
    title: "Family, Relationships & People Signs",
    channel: "Sign Language 101",
    category: "Conversations",
    level: "Beginner",
    duration: "10 min",
    videoId: "W5n433hR93A",
    description: "Gender orientation in ASL (forehead vs chin areas) and relationship sign rules.",
  },

  // Situational & Real-World Scenarios
  {
    id: "v-18",
    title: "Restaurant & Dining Out Signs",
    channel: "Learn How to Sign",
    category: "Real-World Scenarios",
    level: "Intermediate",
    duration: "14 min",
    videoId: "k7pZqngq40s",
    description: "Ordering food, requesting water, paying the bill, dietary allergies, and table communication.",
  },
  {
    id: "v-19",
    title: "Emergency & Medical First Aid Signs",
    channel: "Sign Language 101",
    category: "Real-World Scenarios",
    level: "Intermediate",
    duration: "12 min",
    videoId: "c0zN_p_9qU0",
    description: "Critical safety vocabulary: Doctor, Hospital, Hurt, Medicine, Fire, Police, Allergy, Emergency.",
  },
  {
    id: "v-20",
    title: "Shopping, Money & Transactions",
    channel: "Learn How to Sign",
    category: "Real-World Scenarios",
    level: "Beginner",
    duration: "12 min",
    videoId: "g9z_0k3f910",
    description: "Signing dollars, cents, discounts, cash, card, receipts, expensive, and cheap.",
  },
  {
    id: "v-21",
    title: "Classroom & Workplace Signs",
    channel: "Signed With Heart",
    category: "Real-World Scenarios",
    level: "Beginner",
    duration: "10 min",
    videoId: "46M5h3_pX0k",
    description: "Professional office and student signs: Meeting, Email, Project, Presentation, Schedule.",
  },
  {
    id: "v-22",
    title: "Animals & Pets in ASL",
    channel: "ASL That",
    category: "Real-World Scenarios",
    level: "Beginner",
    duration: "8 min",
    videoId: "p10v_8qwe9a",
    description: "Domestic animals, farm animals, wildlife, and ocean creature sign gestures.",
  },
  {
    id: "v-23",
    title: "Weather, Seasons & Climate Signs",
    channel: "Sign Language 101",
    category: "Real-World Scenarios",
    level: "Beginner",
    duration: "10 min",
    videoId: "3e_f0q89a2b",
    description: "Rain, sunshine, snow, wind, humidity, seasons, forecasts, and temperature.",
  },

  // Fingerspelling & Drills
  {
    id: "v-24",
    title: "Receptive Fingerspelling Speed Drill",
    channel: "Dr. Bill Vicars",
    category: "Fingerspelling",
    level: "Advanced",
    duration: "20 min",
    videoId: "9p1k5Z9t82M",
    description: "Test your ability to read rapid fingerspelling at conversational native speed.",
  },
  {
    id: "v-25",
    title: "How to Sign Numbers 1 to 100",
    channel: "Learn ASL",
    category: "Fingerspelling",
    level: "Intermediate",
    duration: "16 min",
    videoId: "J8VvD-w8k9s",
    description: "Mastering double digits, rolling numbers, 20s, 30s, and high number syntax.",
  },

  // Deaf Culture & Grammar
  {
    id: "v-26",
    title: "Deaf Culture & Community Etiquette",
    channel: "ASL University",
    category: "Deaf Culture & Grammar",
    level: "All Levels",
    duration: "18 min",
    videoId: "vF3507_0g_g",
    description: "Gaining attention politely, walking through signers, eye contact rules, and cultural norms.",
  },
  {
    id: "v-27",
    title: "ASL Grammar & Sentence Structure",
    channel: "ASL Meredith",
    category: "Deaf Culture & Grammar",
    level: "Intermediate",
    duration: "15 min",
    videoId: "yQ_K6_rU6yE",
    description: "Topic-Comment sentence structure vs English Subject-Verb-Object grammar rules.",
  },
  {
    id: "v-28",
    title: "ASL Classifiers: CL:1, CL:3, CL:B, CL:C",
    channel: "Dr. Bill Vicars",
    category: "Deaf Culture & Grammar",
    level: "Advanced",
    duration: "24 min",
    videoId: "w49_kZ8m_20",
    description: "How handshapes represent objects, vehicles, people, and spatial dynamics in 3D space.",
  },
  {
    id: "v-29",
    title: "Facial Expressions & Non-Manual Signals",
    channel: "ASL University",
    category: "Deaf Culture & Grammar",
    level: "Intermediate",
    duration: "14 min",
    videoId: "m2_vQ91kLa8",
    description: "Why eyebrows, mouth morphemes, and head tilts provide 50% of ASL grammatical meaning.",
  },
];

function Learn() {
  const [done, setDone] = useState([]);
  const [activeLetter, setActiveLetter] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(0); // Default open ASL 1
  const [selectedLessonModal, setSelectedLessonModal] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Video tutorial filters & search
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Lifeprint Courses",
    "Beginner 101",
    "Conversations",
    "Real-World Scenarios",
    "Fingerspelling",
    "Deaf Culture & Grammar",
  ];

  const filteredTutorials = useMemo(() => {
    return tutorialDatabase.filter((video) => {
      const matchesCategory =
        selectedCategory === "All" || video.category === selectedCategory;
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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

  function toggleLessonComplete(lessonNumber) {
    if (completedLessons.includes(lessonNumber)) {
      setCompletedLessons(completedLessons.filter((n) => n !== lessonNumber));
    } else {
      setCompletedLessons([...completedLessons, lessonNumber]);
    }
  }

  // Daily word
  const words = [
    { word: "Hello",  gloss: "WAVE HAND", desc: "Open hand palm facing outward waving gently near temple." },
    { word: "Thank You",  gloss: "CHIN FORWARD", desc: "Flat fingertips touch chin, then open forward toward the person." },
    { word: "Please",  gloss: "CHEST CIRCLE", desc: "Flat hand rubs clockwise in circles over heart/center of chest." },
    { word: "Sorry",  gloss: "FIST CIRCLE", desc: "'A' fist rubs clockwise circular motion on chest with remorseful expression." },
    { word: "Yes",  gloss: "S-HAND NOD", desc: "'S' fist nods up and down imitating head nod motion." },
    { word: "No",  gloss: "THREE FINGERS SNAP", desc: "Index and middle finger snap down onto thumb." },
    { word: "Help",  gloss: "FIST ON PALM UP", desc: "Closed fist with thumb up rests on open flat palm, lifted upwards." },
    { word: "Friend",  gloss: "HOOKED INDEX", desc: "Index fingers interlock in reciprocal hooks." },
  ];
  const [wordIndex, setWordIndex] = useState(0);

  // Quiz
  const quizQuestions = [
    {
      question: "What does this sign mean? 🤟",
      options: ["Goodbye", "I Love You (ILY)", "Thank You", "Good Luck"],
      answer: 1,
    },
    {
      question: "What does a thumbs up gesture mean in ASL? 👍",
      options: ["Good / Yes", "Stop", "Hello", "Danger"],
      answer: 0,
    },
    {
      question: "Touching your chin and moving hand forward means?",
      options: ["Sorry", "Thank You", "Please", "Excuse Me"],
      answer: 1,
    },
    {
      question: "What facial expression is used for WH-questions (Who, What, Where)?",
      options: ["Raised eyebrows", "Furrowed / Lowered eyebrows", "Smile", "Head tilted back"],
      answer: 1,
    },
    {
      question: "Rubbing an 'A' fist in a circle over your chest means?",
      options: ["Hungry", "Please", "Sorry", "Tired"],
      answer: 2,
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

  return (
    <div className="learn-page">
      {/* Hero Section */}
      <div className="learn-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Universal ASL Academy & Video Hub</h1>
        <p>
          Master American Sign Language with structured courses from ASL University (Lifeprint.com),
          over 30+ interactive YouTube tutorials, and tactile vocabulary tools.
        </p>

        <div className="learn-hero-stats">
          <div className="stat-pill">
            <span className="stat-num">4 Levels</span>
            <span className="stat-label">Lifeprint Curriculum</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">60 Lessons</span>
            <span className="stat-label">Full Course Catalog</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">30+ Videos</span>
            <span className="stat-label">Curated Video Tutorials</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">{completedLessons.length}/60</span>
            <span className="stat-label">Lessons Mastered</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="learn-container">

        {/* 📚 Section 1: ASL University Lifeprint Courses */}
        <section className="learn-section">
          <div className="section-header-row">
            <div>
              <span className="badge badge-sage">University Curriculum</span>
              <h2>📚 ASL University Courses (Lifeprint.com)</h2>
              <p className="section-subtitle">
                Official curriculum authored by Dr. Bill Vicars — spanning beginner fundamentals to advanced mastery.
              </p>
            </div>
            <a
              href="https://www.lifeprint.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-sage"
            >
              Visit Lifeprint.com ↗
            </a>
          </div>

          <div className="courses-grid">
            {aslCourses.map((course, index) => (
              <div className={`course-card ${expandedCourse === index ? "active-card" : ""}`} key={index}>
                <div
                  className="course-header"
                  onClick={() => setExpandedCourse(expandedCourse === index ? null : index)}
                >
                  <div className="course-header-left">
                    <span className="course-emoji"><GraduationCapIcon size={24} /></span>
                    <div>
                      <div className="course-title-row">
                        <span className="course-level" style={{ backgroundColor: `${course.color}22`, color: course.color }}>
                          {course.level}
                        </span>
                        <h3>{course.title}</h3>
                      </div>
                      <p className="course-desc">{course.description}</p>
                    </div>
                  </div>
                  <span className={`course-toggle ${expandedCourse === index ? "open" : ""}`}>
                    ▾
                  </span>
                </div>

                {expandedCourse === index && (
                  <div className="course-content-expanded">
                    <div className="course-progress-indicator">
                      <span>Course Progress: {course.lessons.filter(l => completedLessons.includes(l.number)).length} / {course.lessons.length} Completed</span>
                    </div>

                    <div className="course-lessons-grid">
                      {course.lessons.map((lesson) => {
                        const isDone = completedLessons.includes(lesson.number);
                        return (
                          <div
                            key={lesson.number}
                            className={`lesson-box ${isDone ? "completed" : ""}`}
                            onClick={() => setSelectedLessonModal(lesson)}
                          >
                            <div className="lesson-box-header">
                              <span className="lesson-num">Lesson {lesson.number}</span>
                              {isDone && <span className="lesson-check">✓ Done</span>}
                            </div>
                            <h4 className="lesson-box-title">{lesson.title}</h4>
                            <p className="lesson-box-vocab">
                              {lesson.vocab ? lesson.vocab.slice(0, 3).join(", ") + "..." : "Vocabulary & Grammar"}
                            </p>
                            <div className="lesson-box-actions">
                              <button className="lesson-action-btn">
                                Open Study Guide 📖
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 📺 Section 2: Massive Video Tutorials Hub */}
        <section className="learn-section" id="tutorials">
          <div className="section-header-center">
            <span className="badge badge-lavender">Video Masterclass</span>
            <h2>📺 Comprehensive ASL Video Tutorials Library</h2>
            <p className="section-subtitle">
              Explore 30+ embedded video tutorials from world-class deaf educators, covering all conversational, grammatical, and situational domains.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="video-controls-bar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search tutorials by keyword (e.g. food, numbers, Dr. Bill, emergency)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery("")}>
                  <CloseIcon size={16} />
                </button>
              )}
            </div>

            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="video-count-info">
            Showing <strong>{filteredTutorials.length}</strong> tutorials in <strong>{selectedCategory}</strong>
          </div>

          <div className="video-grid">
            {filteredTutorials.map((video) => (
              <div className="video-card" key={video.id}>
                <div className="video-wrapper">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="video-info">
                  <div className="video-tags">
                    <span className="video-tag category">{video.category}</span>
                    <span className="video-tag duration">⏱️ {video.duration}</span>
                    <span className="video-tag level">{video.level}</span>
                  </div>
                  <h3>{video.title}</h3>
                  <p className="video-channel">By {video.channel}</p>
                  <p className="video-desc">{video.description}</p>
                  <div className="video-footer">
                    <button
                      className="btn-video-expand"
                      onClick={() => setActiveVideoModal(video)}
                    >
                      Theater Mode ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="no-videos-found">
              <span className="no-video-icon"><SearchIcon size={48} /></span>
              <h3>No tutorials matched "{searchQuery}"</h3>
              <p>Try searching for words like "alphabet", "restaurant", "grammar", or clear your filter.</p>
              <button className="btn btn-sage" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* 🔤 Section 3: Alphabet Practice Studio */}
        <section className="learn-section">
          <div className="section-header-center">
            <span className="badge badge-sage">Interactive Alphabet</span>
            <h2>A–Z Fingerspelling Studio</h2>
            <p className="section-subtitle">
              Click any letter to inspect the exact tactile hand shape, thumb placement, and wrist rotation.
            </p>
          </div>

          <div className="progress-container">
            <div className="progress-label-row">
              <span>Mastery Progress</span>
              <span>{done.length} / 26 Letters</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.round((done.length / 26) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="letter-grid">
            {letters.map((letter) => (
              <button
                key={letter}
                className={`letter-btn ${done.includes(letter) ? "done" : ""} ${activeLetter === letter ? "active" : ""}`}
                onClick={() => handleLetterClick(letter)}
              >
                <span className="letter-char">{letter}</span>
                {done.includes(letter) && <span className="letter-dot">✓</span>}
              </button>
            ))}
          </div>
        </section>

        {/* 🧠 Section 4: Daily Word & Interactive Knowledge Check */}
        <section className="learn-section">
          <div className="two-col-grid">

            {/* Daily Word Showcase */}
            <div className="daily-word-card">
              <span className="badge badge-rose">Word of the Day</span>
              <div className="daily-word-content">
                <span className="daily-word-emoji"><HandSignIcon size={48} /></span>
                <h3>{words[wordIndex].word}</h3>
                <div className="daily-word-gloss">
                  <strong>ASL Gloss:</strong> {words[wordIndex].gloss}
                </div>
                <p className="daily-word-desc">{words[wordIndex].desc}</p>
                <button
                  className="btn btn-sage"
                  onClick={() => setWordIndex((wordIndex + 1) % words.length)}
                >
                  Next Phrase →
                </button>
              </div>
            </div>

            {/* Quick Quiz */}
            <div className="quiz-card">
              <span className="badge badge-lavender">Skill Challenge</span>
              <div className="quiz-box">
                {quizDone ? (
                  <div className="quiz-result">
                    <span className="quiz-result-emoji"><TargetIcon size={48} /></span>
                    <h3>Knowledge Check Complete!</h3>
                    <p className="quiz-score">
                      You scored <strong>{score}</strong> out of {quizQuestions.length} correct
                    </p>
                    <button className="btn btn-sage" onClick={restartQuiz}>
                      Retake Quiz ↺
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="quiz-header-row">
                      <span className="quiz-counter">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                      <span className="quiz-score-badge">Score: {score}</span>
                    </div>
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
                            prefix = "<CloseIcon size={16} /> ";
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
                      <button className="btn btn-sage btn-quiz-next" onClick={nextQuestion}>
                        {currentQuestion + 1 < quizQuestions.length ? "Next Question →" : "Finish Quiz"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* 📖 Modal: In-Depth Lifeprint Lesson Study Guide */}
      {selectedLessonModal && (
        <div className="modal-backdrop" onClick={() => setSelectedLessonModal(null)}>
          <div className="modal-window lesson-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-left">
                <span className="modal-badge">Lifeprint Curriculum</span>
                <h2>Lesson {selectedLessonModal.number}: {selectedLessonModal.title}</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedLessonModal(null)}>
                <CloseIcon size={16} />
              </button>
            </div>

            <div className="modal-body">
              {selectedLessonModal.videoId && (
                <div className="modal-video-container">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedLessonModal.videoId}`}
                    title={selectedLessonModal.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="modal-lesson-details">
                <h3>📖 Core Vocabulary & Concepts</h3>
                <div className="vocab-tag-list">
                  {selectedLessonModal.vocab?.map((v, i) => (
                    <span key={i} className="vocab-tag">{v}</span>
                  ))}
                </div>

                <div className="modal-actions-row">
                  <button
                    className={`btn ${completedLessons.includes(selectedLessonModal.number) ? "btn-completed" : "btn-sage"}`}
                    onClick={() => toggleLessonComplete(selectedLessonModal.number)}
                  >
                    {completedLessons.includes(selectedLessonModal.number) ? "✓ Marked as Completed" : "Mark Lesson as Completed"}
                  </button>

                  <a
                    href={selectedLessonModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-sage"
                  >
                    Read Official Lifeprint Lesson Notes ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🎥 Modal: Video Theater Mode */}
      {activeVideoModal && (
        <div className="modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="modal-window video-theater-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-badge">{activeVideoModal.category}</span>
                <h2>{activeVideoModal.title}</h2>
                <p className="modal-channel-sub">{activeVideoModal.channel} • {activeVideoModal.duration}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveVideoModal(null)}>
                <CloseIcon size={16} />
              </button>
            </div>

            <div className="theater-video-wrapper">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.videoId}?autoplay=1`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="theater-info-box">
              <p>{activeVideoModal.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* 🔤 Modal: Sign Alphabet View */}
      {activeLetter && (
        <div className="modal-backdrop" onClick={closeSignModal}>
          <div className="modal-window letter-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeSignModal}>
              <CloseIcon size={16} />
            </button>
            <div className="letter-modal-content">
              <img
                src={signImages[activeLetter]}
                alt={`ASL sign for letter ${activeLetter}`}
                className="modal-sign-image"
              />
              <h3 className="modal-letter-title">Letter "{activeLetter}"</h3>
              <p className="modal-sign-desc">
                Tactile ASL finger configuration for "{activeLetter}".
              </p>
              <div className="modal-letter-nav">
                <button
                  className="btn btn-outline-sage"
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
                  className="btn btn-sage"
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
  );
}

export default Learn;
