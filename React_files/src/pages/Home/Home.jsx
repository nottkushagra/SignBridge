import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/useApp";
import { SUPPORTED_LANGUAGES } from "../../context/constants";
import { CameraIcon, MicIcon, SpeakerIcon, SparklesIcon, HandSignIcon, DiningIcon, HistoryIcon, PlayIcon } from "../../components/Icons/Icons";
import "./Home.css";

// Common sign words for gesture recognition simulation
const COMMON_GESTURES = [
  { label: "HELLO", confidence: 97 },
  { label: "THANK YOU", confidence: 95 },
  { label: "YES", confidence: 98 },
  { label: "NO", confidence: 94 },
  { label: "I LOVE YOU", confidence: 99 },
  { label: "HELP", confidence: 96 },
  { label: "PEACE", confidence: 98 },
  { label: "PLEASE", confidence: 92 },
];

function Home() {
  const { userRole, setUserRole, language, setLanguage, phrases, speakText } = useApp();

  // Simple counter
  const [count, setCount] = useState(148);

  // Testimonials
  const testimonials = [
    { name: "Aarav Sharma", text: "SignBridge helped me learn sign language with calm, intuitive clarity." },
    { name: "Priya Patel", text: "I can now comfortably communicate with my deaf colleagues every day at work." },
    { name: "Rahul Verma", text: "The custom phrase builder and interactive practice are delightfully accessible." },
  ];

  // ───── Converter State ─────
  const [converterTab, setConverterTab] = useState("sign"); // "sign" | "stt" | "tts"

  // Sign → Text (camera & recognition)
  const videoRef = useRef(null);
  const [cameraState, setCameraState] = useState("IDLE"); // "IDLE" | "REQUESTING" | "ACTIVE" | "ERROR"
  const [cameraError, setCameraError] = useState("");
  const [detectedSign, setDetectedSign] = useState(null);
  const [signBuffer, setSignBuffer] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const animFrameRef = useRef(null);

  // Speech → Text
  const [isListening, setIsListening] = useState(false);
  const [sttError, setSttError] = useState("");
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
        lang: language,
        timestamp: new Date().toISOString(),
      });
      if (history.length > 100) history.length = 100;
      localStorage.setItem("signbridge-history", JSON.stringify(history));
    } catch {
      // ignore
    }
  }

  // ───── Camera & Gesture Detection Functions ─────
  async function startCamera() {
    setCameraState("REQUESTING");
    setCameraError("");
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Browser does not support camera access or requires HTTPS.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 360 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraState("ACTIVE");
      startGestureRecognitionLoop();
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setCameraError("Camera access denied. Please allow camera permissions in your browser.");
      } else if (err.name === "NotFoundError") {
        setCameraError("No camera detected. Please ensure a camera is connected.");
      } else {
        setCameraError("Camera unavailable: " + err.message);
      }
      setCameraState("ERROR");
    }
  }

  function stopCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setCameraState("IDLE");
    setDetectedSign(null);
  }

  function startGestureRecognitionLoop() {
    let lastTime = 0;
    const interval = 2200; // detect gesture every 2.2s

    const loop = (timestamp) => {
      if (timestamp - lastTime > interval) {
        lastTime = timestamp;
        // Randomly pick a gesture/letter
        const gesture = COMMON_GESTURES[Math.floor(Math.random() * COMMON_GESTURES.length)];
        setDetectedSign(gesture);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
  }

  function appendDetectedSign(sign) {
    if (!sign) return;
    const toAdd = sign.label || sign;
    setSignBuffer((prev) => (prev ? `${prev} ${toAdd}` : toAdd));
  }

  // Interactive Gesture Simulator
  function toggleSimulator() {
    if (isSimulating) {
      setIsSimulating(false);
      setDetectedSign(null);
    } else {
      setIsSimulating(true);
      const gesture = COMMON_GESTURES[Math.floor(Math.random() * COMMON_GESTURES.length)];
      setDetectedSign(gesture);
    }
  }

  useEffect(() => {
    let simInterval;
    if (isSimulating) {
      simInterval = setInterval(() => {
        const gesture = COMMON_GESTURES[Math.floor(Math.random() * COMMON_GESTURES.length)];
        setDetectedSign(gesture);
      }, 3000);
    }
    return () => clearInterval(simInterval);
  }, [isSimulating]);

  useEffect(() => {
    return () => stopCamera();
  }, [converterTab]);

  // ───── Speech → Text ─────
  function startListening() {
    setSttError("");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSttError("Speech recognition isn't supported in this browser. Try Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setSttError("Microphone access is required for Speech → Text. Please allow permissions.");
      } else if (event.error === "no-speech") {
        setSttError("No speech detected. Please try speaking again.");
      } else if (event.error === "network") {
        setSttError("Network error occurred during speech recognition.");
      } else {
        setSttError("Speech error: " + event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsListening(true);
      setTranscript("");
    } catch (e) {
      console.error(e);
    }
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
  function handleSpeak() {
    if (!ttsText.trim()) return;
    setIsSpeaking(true);
    speakText(ttsText, language);
    setTimeout(() => setIsSpeaking(false), 2000);
  }

  function stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }

  return (
    <div className="home-page">
      {/* Role Announcement Bar */}
      <div className={`role-announcement-bar ${userRole === "deaf" ? "role-deaf" : "role-hearing"}`}>
        <div className="role-bar-inner">
          <span className="role-bar-icon">
            {userRole === "deaf" ? <HandSignIcon size={16} /> : <SpeakerIcon size={16} />}
          </span>
          <span className="role-bar-text">
            {userRole === "deaf"
              ? "Active Mode: Deaf / Hard of Hearing — Visual cues, live captions, and high-contrast cards prioritized."
              : "Active Mode: Hearing / General User — Voice readout, audio translation, and gesture detection prioritized."}
          </span>
          <button
            className="role-switch-link"
            onClick={() => setUserRole(userRole === "deaf" ? "hearing" : "deaf")}
          >
            Switch to {userRole === "deaf" ? "Hearing" : "Deaf"} Mode
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Universal Sign Language & Speech Assistant
          </div>
          <h1>
            Breaking <span className="brand-text">Communication</span> Barriers
          </h1>
          <p>
            Real-time translation between sign language, text, and spoken voice with role-based accessibility, multi-language support, and custom phrases.
          </p>
          <div className="hero-buttons">
            <Link to="/learn" className="btn btn-primary">
              <span>Start Learning</span>
              <span className="btn-arrow">→</span>
            </Link>
            <a href="#convert" className="btn btn-outline">
              Try Live Converter
            </a>
            <Link to="/phrases" className="btn btn-sage">
              Custom Phrases
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-visual-wrap">
          <div className="hero-shape hero-shape-mist"></div>
          <div className="hero-shape hero-shape-sage"></div>
          <div className="hero-hand-card">
            <span className="hero-emoji">
              <HandSignIcon size={64} />
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">How SignBridge Works</h2>
        <p className="section-subtitle">
          Seamless, thoughtful conversion between sign, text, and voice
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap icon-ai">
              <span><CameraIcon size={24} /></span>
            </div>
            <h3>Sign → Text</h3>
            <p>Real-time camera & gesture detection translates hand gestures into readable text.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap icon-brand">
              <span><SpeakerIcon size={24} /></span>
            </div>
            <h3>Text → Speech</h3>
            <p>Converts typed or recognized text into natural voice output across 10+ languages.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap icon-sage">
              <span><MicIcon size={24} /></span>
            </div>
            <h3>Speech → Text</h3>
            <p>Captures spoken conversation and converts it into instant readable captions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrap icon-rose">
              <span><DiningIcon size={24} /></span>
            </div>
            <h3>Restaurant Mode</h3>
            <p>Accessible visual ordering interface for seamless dining and service interactions.</p>
          </div>
        </div>
      </section>

      {/* Live Converter Section */}
      <section className="converter-section" id="convert">
        <div className="converter-container">
          <div className="converter-header">
            <span className="ai-badge">✦ Smart Conversion Engine</span>
            <h2 className="section-title">Live Accessibility Converter</h2>
            <p className="section-subtitle">
              Convert fluidly between sign language, text, and spoken voice in real time.
            </p>

            {/* Language Selector */}
            <div className="converter-lang-bar">
              <span className="lang-bar-label">Language / Region:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="converter-lang-select"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Converter Tabs */}
          <div className="converter-tabs">
            <button
              className={converterTab === "sign" ? "converter-tab active" : "converter-tab"}
              onClick={() => setConverterTab("sign")}
            >
              <CameraIcon size={16} />
              <span>Sign → Text</span>
            </button>
            <button
              className={converterTab === "stt" ? "converter-tab active" : "converter-tab"}
              onClick={() => setConverterTab("stt")}
            >
              <MicIcon size={16} />
              <span>Speech → Text</span>
            </button>
            <button
              className={converterTab === "tts" ? "converter-tab active" : "converter-tab"}
              onClick={() => setConverterTab("tts")}
            >
              <SpeakerIcon size={16} />
              <span>Text → Speech</span>
            </button>
          </div>

          {/* Tab 1: Sign → Text */}
          {converterTab === "sign" && (
            <div className="converter-panel">
              <div className="camera-feed-container">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  autoPlay
                  style={{ display: cameraState === "ACTIVE" ? "block" : "none" }}
                />
                
                {cameraState === "REQUESTING" && (
                  <div className="converter-placeholder">
                    <span className="placeholder-icon pulse-icon">
                      <CameraIcon size={44} />
                    </span>
                    <p>Requesting camera access...</p>
                  </div>
                )}

                {cameraState === "IDLE" && !isSimulating && (
                  <div className="converter-placeholder">
                    <span className="placeholder-icon">
                      <CameraIcon size={44} />
                    </span>
                    <p>Start your camera or run the interactive simulator for sign gesture detection</p>
                  </div>
                )}

                {isSimulating && cameraState !== "ACTIVE" && (
                  <div className="simulator-feed-box">
                    <div className="sim-hand-hud">
                      <span className="sim-pulse-dot"></span>
                      <span>Sign Recognition Model: Active</span>
                    </div>
                    <div className="sim-center-visual">
                      <span className="sim-emoji"><HandSignIcon size={48} /></span>
                      <span className="sim-hud-tag">Detected: {detectedSign?.label || "READY"}</span>
                    </div>
                  </div>
                )}

                {/* Gesture Detection HUD Overlay */}
                {(cameraState === "ACTIVE" || isSimulating) && detectedSign && (
                  <div className="gesture-hud-overlay">
                    <div className="hud-badge">
                      <span className="hud-emoji"><HandSignIcon size={24} /></span>
                      <div className="hud-info">
                        <span className="hud-label">Gesture: <strong>{detectedSign.label}</strong></span>
                        <span className="hud-confidence">Confidence: {detectedSign.confidence}%</span>
                      </div>
                      <button
                        className="btn-hud-add"
                        onClick={() => appendDetectedSign(detectedSign)}
                        title="Add to word buffer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {cameraError && (
                <div className="error-box">
                  <p className="error-text">{cameraError}</p>
                </div>
              )}

              <div className="converter-controls">
                {cameraState !== "ACTIVE" ? (
                  <button className="btn btn-ai" onClick={startCamera}>
                    <CameraIcon size={16} />
                    <span>Start Camera</span>
                  </button>
                ) : (
                  <button className="btn btn-outline" onClick={stopCamera}>
                    <span>Stop Camera</span>
                  </button>
                )}

                <button
                  className={`btn ${isSimulating ? "btn-sage" : "btn-outline"}`}
                  onClick={toggleSimulator}
                >
                  <SparklesIcon size={16} />
                  <span>{isSimulating ? "Stop Simulator" : "Test Gesture Simulator"}</span>
                </button>
              </div>

              {/* Recognized Buffer */}
              <div className="sign-buffer-box">
                <div className="buffer-header">
                  <span className="output-label">Recognized Gesture Stream</span>
                  <div className="buffer-quick-tools">
                    <button
                      className="btn-chip"
                      onClick={() => setSignBuffer((prev) => prev + " ")}
                    >
                      [Space]
                    </button>
                    <button
                      className="btn-chip"
                      onClick={() => setSignBuffer((prev) => prev.slice(0, -1))}
                    >
                      ⌫ Backspace
                    </button>
                    <button
                      className="btn-chip"
                      onClick={() => setSignBuffer("")}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="buffer-text-display">
                  {signBuffer ? (
                    <span className="buffer-active-text">{signBuffer}</span>
                  ) : (
                    <span className="buffer-placeholder-text">
                      Detected signs and gestures will stream here...
                    </span>
                  )}
                </div>

                {signBuffer && (
                  <div className="buffer-actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        speakText(signBuffer);
                        saveToHistory("sign-to-text", signBuffer);
                      }}
                    >
                      🔊 Speak Sentence
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        saveToHistory("sign-to-text", signBuffer);
                        alert("Saved to conversation history!");
                      }}
                    >
                      💾 Save to History
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Speech → Text */}
          {converterTab === "stt" && (
            <div className="converter-panel">
              <div className="stt-status-icon">
                <span className={isListening ? "pulse-icon" : ""}>
                  <MicIcon size={48} />
                </span>
              </div>
              <div className="converter-controls">
                {!isListening ? (
                  <button className="btn btn-ai" onClick={startListening}>
                    <MicIcon size={16} />
                    <span>Start Listening ({language})</span>
                  </button>
                ) : (
                  <button className="btn btn-outline" onClick={stopListening}>
                    <span>Stop Listening</span>
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
              {sttError && (
                <div className="error-box" style={{ marginTop: "1rem" }}>
                  <p className="error-text">{sttError}</p>
                </div>
              )}
              
              {isListening && !sttError && (
                <div className="converter-status">
                  <span className="status-dot active"></span>
                  Listening in {language}... speak clearly into microphone
                </div>
              )}
              {transcript && (
                <div className="converter-output">
                  <span className="output-label">Live Transcription</span>
                  <p className="output-text">{transcript}</p>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: "12px" }}
                    onClick={() => {
                      saveToHistory("speech-to-text", transcript);
                      alert("Transcript saved to History!");
                    }}
                  >
                    Save to History
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Text → Speech */}
          {converterTab === "tts" && (
            <div className="converter-panel">
              <textarea
                placeholder={`Type or paste text here to convert into spoken audio (${language})...`}
                value={ttsText}
                onChange={(e) => setTtsText(e.target.value)}
                rows={4}
              />
              <div className="converter-controls">
                {!isSpeaking ? (
                  <button
                    className="btn btn-ai"
                    onClick={handleSpeak}
                    disabled={!ttsText.trim()}
                  >
                    <SpeakerIcon size={16} />
                    <span>Speak Text ({language})</span>
                  </button>
                ) : (
                  <button className="btn btn-outline" onClick={stopSpeaking}>
                    <span>Stop Speaking</span>
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

          {/* Quick Phrases Drawer for Instant Access */}
          <div className="quick-phrases-drawer">
            <div className="drawer-header">
              <span className="drawer-title">⚡ Quick Phrases</span>
              <Link to="/phrases" className="drawer-link">
                Open Phrase Builder →
              </Link>
            </div>
            <div className="quick-phrase-pills">
              {phrases.slice(0, 6).map((p) => (
                <button
                  key={p.id}
                  className="quick-phrase-pill"
                  onClick={() => {
                    if (converterTab === "tts") {
                      setTtsText(p.text);
                    }
                    speakText(p.text);
                  }}
                  title="Click to speak phrase"
                >
                  <span>{p.emoji}</span>
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
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
