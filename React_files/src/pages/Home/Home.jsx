import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  // Simple counter
  const [count, setCount] = useState(0);

  // Testimonials
  const testimonials = [
    { name: "Aarav", text: "SignBridge helped me learn sign language with calm, intuitive clarity." },
    { name: "Priya", text: "I can now comfortably communicate with my deaf colleagues every day." },
    { name: "Rahul", text: "The alphabet practice and interactive speed rounds are delightfully accessible." },
  ];

  // ───── Converter State ─────
  const [converterTab, setConverterTab] = useState("sign"); // "sign" | "stt" | "tts"

  // Sign → Text (camera)
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");

  // Speech → Text
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  // Text → Speech
  const [ttsText, setTtsText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Conversation history helper
  function saveToHistory(type, content) {
    try {
      const history = JSON.parse(localStorage.getItem("signbridge-history") || "[]");
      history.unshift({
        id: Date.now(),
        type,
        content,
        timestamp: new Date().toISOString(),
      });
      if (history.length > 100) history.length = 100;
      localStorage.setItem("signbridge-history", JSON.stringify(history));
    } catch (e) {
      // ignore
    }
  }

  // ───── Camera Functions ─────
  async function startCamera() {
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 360 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      setCameraError("Camera access denied. Please allow camera permission.");
    }
  }

  function stopCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }

  useEffect(() => {
    return () => stopCamera();
  }, [converterTab]);

  // ───── Speech → Text ─────
  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript("Speech recognition is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      setTranscript("Error: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript("");
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (transcript) {
      saveToHistory("speech-to-text", transcript);
    }
  }

  // ───── Text → Speech ─────
  function speakText() {
    if (!ttsText.trim()) return;
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    saveToHistory("text-to-speech", ttsText);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Universal Sign Language Assistant
          </div>
          <h1>
            Breaking <span className="brand-text">Communication</span> Barriers
          </h1>
          <p>
            Converting sign language to text, speech to text, and text to speech
            in real time — designed for accessible, human connection.
          </p>
          <div className="hero-buttons">
            <Link to="/learn" className="btn btn-primary">
              <span>Start Learning</span>
              <span className="btn-arrow">→</span>
            </Link>
            <a href="#convert" className="btn btn-outline">
              Try Converter
            </a>
          </div>
        </div>

        {/* Hero Editorial Hand Visual with Organic Mist & Sage Shapes */}
        <div className="hero-visual-wrap">
          <div className="hero-shape hero-shape-mist"></div>
          <div className="hero-shape hero-shape-sage"></div>
          <div className="hero-hand-card">
            <span className="hero-emoji" role="img" aria-label="Sign language I Love You hand gesture">🤟</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Seamless, thoughtful conversion between sign, text, and voice
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap icon-ai">
              <span>🎥</span>
            </div>
            <h3>Sign → Text</h3>
            <p>Real-time camera detection translates hand gestures into readable text.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap icon-brand">
              <span>🗣️</span>
            </div>
            <h3>Text → Speech</h3>
            <p>Converts typed or recognized text into natural, clear voice output.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap icon-sage">
              <span>🎙️</span>
            </div>
            <h3>Speech → Text</h3>
            <p>Captures spoken conversation and converts it into readable text.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap icon-rose">
              <span>🍽️</span>
            </div>
            <h3>Restaurant Mode</h3>
            <p>Accessible visual ordering interface for deaf and mute individuals.</p>
          </div>
        </div>
      </section>

      {/* Practice CTA (Soft Mist Blue Section) */}
      <section className="practice-cta-section">
        <div className="practice-cta-inner">
          <div className="practice-cta-content">
            <h2>Practice & <span className="sage-text">Improve</span></h2>
            <p>
              Master sign language at your own pace with interactive flashcards,
              timed speed rounds, and fingerspelling exercises.
            </p>
            <Link to="/practice" className="btn btn-sage">
              Start Practicing
            </Link>
          </div>
        </div>
      </section>

      {/* Converter Section (Subtle Lavender AI Section) */}
      <section className="converter-section" id="convert">
        <div className="converter-container">
          <div className="converter-header">
            <span className="ai-badge">✦ Smart Conversion</span>
            <h2 className="section-title">Live Converter</h2>
            <p className="section-subtitle">
              Convert fluidly between sign language, text, and spoken voice.
            </p>
          </div>

          <div className="converter-tabs">
            <button
              className={converterTab === "sign" ? "converter-tab active" : "converter-tab"}
              onClick={() => setConverterTab("sign")}
            >
              🎥 Sign → Text
            </button>
            <button
              className={converterTab === "stt" ? "converter-tab active" : "converter-tab"}
              onClick={() => setConverterTab("stt")}
            >
              🎙️ Speech → Text
            </button>
            <button
              className={converterTab === "tts" ? "converter-tab active" : "converter-tab"}
              onClick={() => setConverterTab("tts")}
            >
              🗣️ Text → Speech
            </button>
          </div>

          {/* Sign → Text Tab */}
          {converterTab === "sign" && (
            <div className="converter-panel">
              <video
                ref={videoRef}
                muted
                playsInline
                style={{ display: cameraActive ? "block" : "none" }}
              />
              {!cameraActive && !cameraError && (
                <div className="converter-placeholder">
                  <span className="placeholder-icon">📷</span>
                  <p>Start your camera to begin live sign gesture detection</p>
                </div>
              )}
              {cameraError && (
                <p className="error-text">{cameraError}</p>
              )}
              <div className="converter-controls">
                {!cameraActive ? (
                  <button className="btn btn-ai" onClick={startCamera}>
                    📷 Start Camera
                  </button>
                ) : (
                  <button className="btn btn-outline" onClick={stopCamera}>
                    ⬛ Stop Camera
                  </button>
                )}
              </div>
              {cameraActive && (
                <>
                  <div className="converter-status">
                    <span className="status-dot active"></span>
                    Camera active — show hand signs clearly to the frame
                  </div>
                  <p className="converter-note">
                    💡 Real-time camera feed active. Gesture detection models connect directly to this pipeline.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Speech → Text Tab */}
          {converterTab === "stt" && (
            <div className="converter-panel">
              <div className="stt-status-icon">
                <span className={isListening ? "pulse-icon" : ""}>
                  {isListening ? "🔴" : "🎙️"}
                </span>
              </div>
              <div className="converter-controls">
                {!isListening ? (
                  <button className="btn btn-ai" onClick={startListening}>
                    🎙️ Start Listening
                  </button>
                ) : (
                  <button className="btn btn-outline" onClick={stopListening}>
                    ⬛ Stop Listening
                  </button>
                )}
                {transcript && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setTranscript("")}
                  >
                    Clear
                  </button>
                )}
              </div>
              {isListening && (
                <div className="converter-status">
                  <span className="status-dot active"></span>
                  Listening... speak clearly into your microphone
                </div>
              )}
              {transcript && (
                <div className="converter-output">
                  <span className="output-label">Transcription</span>
                  <p className="output-text">{transcript}</p>
                </div>
              )}
            </div>
          )}

          {/* Text → Speech Tab */}
          {converterTab === "tts" && (
            <div className="converter-panel">
              <textarea
                placeholder="Type or paste text here to convert into spoken audio..."
                value={ttsText}
                onChange={(e) => setTtsText(e.target.value)}
                rows={4}
              />
              <div className="converter-controls">
                {!isSpeaking ? (
                  <button
                    className="btn btn-ai"
                    onClick={speakText}
                    disabled={!ttsText.trim()}
                  >
                    🔊 Speak Text
                  </button>
                ) : (
                  <button className="btn btn-outline" onClick={stopSpeaking}>
                    ⬛ Stop Speaking
                  </button>
                )}
                {ttsText && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setTtsText("")}
                  >
                    Clear
                  </button>
                )}
              </div>
              {isSpeaking && (
                <div className="converter-status">
                  <span className="status-dot active"></span>
                  Speaking aloud...
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Community Stats */}
      <section className="stats-section">
        <div className="stats-box">
          <span className="stats-number">{count}</span>
          <p className="stats-label">Community members learning together</p>
          <button className="btn btn-sage" onClick={() => setCount(count + 1)}>
            I'm Learning Too! 🙋
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Community Stories</h2>
        <p className="section-subtitle">Real experiences with SignBridge</p>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-quote">“</div>
              <p className="testimonial-text">{item.text}</p>
              <p className="testimonial-name">— {item.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
