import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/useApp";
import { SUPPORTED_LANGUAGES } from "../../context/constants";
import "./Phrases.css";

// Import A-Z sign images for fingerspelling preview
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

const CATEGORIES = [
  "All",
  "Favorites",
  "Communication",
  "Greetings",
  "Emergency",
  "Food & Dining",
  "Everyday",
  "Custom",
];

const EMOJI_OPTIONS = ["💬", "👋", "🧏", "🙏", "🚨", "✍️", "🍽️", "💧", "🤟", "🚑", "🚻", "📶", "🏥", "💡", "❤️", "☕"];

function Phrases() {
  const {
    phrases,
    addPhrase,
    deletePhrase,
    toggleFavoritePhrase,
    resetPhrases,
    speakText,
    language,
    setLanguage,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBigDisplay, setShowBigDisplay] = useState(null); // Phrase object
  const [showSpellingModal, setShowSpellingModal] = useState(null); // Phrase object
  const [copiedId, setCopiedId] = useState(null);

  // New Phrase Form State
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState("Everyday");
  const [newEmoji, setNewEmoji] = useState("💬");
  const [newFavorite, setNewFavorite] = useState(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    addPhrase({
      text: newText,
      category: newCategory,
      emoji: newEmoji,
      favorite: newFavorite,
    });
    setNewText("");
    setShowAddModal(false);
  };

  const handleCopy = (phrase) => {
    navigator.clipboard.writeText(phrase.text);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(phrases, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "signbridge_phrasebook.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredPhrases = phrases.filter((phrase) => {
    const matchesCategory =
      activeCategory === "All"
        ? true
        : activeCategory === "Favorites"
        ? phrase.favorite
        : phrase.category.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      phrase.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="phrases-page">
      {/* Hero */}
      <div className="phrases-hero">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="hero-pill-badge">
          <span>💬</span> Custom Phrase Builder
        </div>
        <h1>Instant Accessible Phrases</h1>
        <p>
          Save, customize, and quickly trigger your high-frequency expressions with one-click voice readout, full-screen visual cards, and sign fingerspelling guides.
        </p>

        <div className="phrases-hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + Create New Phrase
          </button>
          <div className="lang-picker-wrap">
            <span className="lang-label">Speech Voice:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="phrases-container">
        {/* Filter and Search Bar */}
        <div className="phrases-toolbar">
          <div className="phrases-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search phrases or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="phrases-search-input"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="category-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={
                  activeCategory === cat
                    ? "category-chip active"
                    : "category-chip"
                }
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "Favorites" && "⭐ "}
                {cat}
                {cat === "Favorites"
                  ? ` (${phrases.filter((p) => p.favorite).length})`
                  : cat === "All"
                  ? ` (${phrases.length})`
                  : ""}
              </button>
            ))}
          </div>

          <div className="phrasebook-utils">
            <button
              className="btn btn-outline btn-sm"
              onClick={handleExportJSON}
            >
              📥 Export JSON
            </button>
            <button
              className="btn btn-outline btn-sm reset-btn"
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all phrases to default starter phrases?"
                  )
                ) {
                  resetPhrases();
                }
              }}
            >
              🔄 Reset Defaults
            </button>
          </div>
        </div>

        {/* Phrase Cards Grid */}
        {filteredPhrases.length === 0 ? (
          <div className="phrases-empty">
            <span className="empty-emoji">📝</span>
            <h3>No phrases found</h3>
            <p>
              {searchQuery
                ? `No phrases match "${searchQuery}". Try a different keyword.`
                : "No phrases in this category. Click below to add one!"}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              + Create Your First Phrase
            </button>
          </div>
        ) : (
          <div className="phrases-grid">
            {filteredPhrases.map((phrase) => (
              <div
                key={phrase.id}
                className={`phrase-card ${
                  phrase.category.toLowerCase() === "emergency"
                    ? "emergency-card"
                    : ""
                }`}
              >
                <div className="phrase-card-header">
                  <div className="phrase-meta">
                    <span className="phrase-emoji">{phrase.emoji}</span>
                    <span className="phrase-category-badge">
                      {phrase.category}
                    </span>
                  </div>
                  <button
                    className={`fav-btn ${phrase.favorite ? "active" : ""}`}
                    onClick={() => toggleFavoritePhrase(phrase.id)}
                    title={
                      phrase.favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    aria-label="Toggle favorite"
                  >
                    {phrase.favorite ? "⭐" : "☆"}
                  </button>
                </div>

                <div className="phrase-card-body">
                  <p className="phrase-text">{phrase.text}</p>
                </div>

                <div className="phrase-card-actions">
                  <button
                    className="btn btn-speak"
                    onClick={() => speakText(phrase.text)}
                    title="Speak text aloud"
                  >
                    🔊 Speak
                  </button>

                  <button
                    className="btn btn-action"
                    onClick={() => setShowBigDisplay(phrase)}
                    title="Show full-screen display card"
                  >
                    📺 Card View
                  </button>

                  <button
                    className="btn btn-action"
                    onClick={() => setShowSpellingModal(phrase)}
                    title="View fingerspelling sign animation"
                  >
                    🤟 Signs
                  </button>

                  <button
                    className="btn btn-action icon-only"
                    onClick={() => handleCopy(phrase)}
                    title="Copy to clipboard"
                  >
                    {copiedId === phrase.id ? "✓" : "📋"}
                  </button>

                  <button
                    className="btn btn-action icon-only delete"
                    onClick={() => deletePhrase(phrase.id)}
                    title="Delete phrase"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Add Phrase Modal ── */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>✨ Create New Phrase</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="form-group">
                <label>Phrase / Sentence Text *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Can you please write down the address for me?"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="Communication">Communication</option>
                    <option value="Greetings">Greetings</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Everyday">Everyday</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Icon</label>
                  <div className="emoji-picker-row">
                    {EMOJI_OPTIONS.slice(0, 8).map((em) => (
                      <button
                        key={em}
                        type="button"
                        className={`emoji-btn ${newEmoji === em ? "active" : ""}`}
                        onClick={() => setNewEmoji(em)}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newFavorite}
                    onChange={(e) => setNewFavorite(e.target.checked)}
                  />
                  Mark as Favorite (Pins to top)
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Phrase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Fullscreen Large Display View (For showing to strangers/waiters/doctors) ── */}
      {showBigDisplay && (
        <div
          className="fullscreen-display-overlay"
          onClick={() => setShowBigDisplay(null)}
        >
          <div
            className="fullscreen-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fullscreen-card-header">
              <span className="big-emoji">{showBigDisplay.emoji}</span>
              <span className="fullscreen-badge">
                {showBigDisplay.category}
              </span>
            </div>
            <h2 className="fullscreen-text">{showBigDisplay.text}</h2>

            <div className="fullscreen-actions">
              <button
                className="btn btn-speak btn-lg"
                onClick={() => speakText(showBigDisplay.text)}
              >
                🔊 Speak Aloud
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => setShowBigDisplay(null)}
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sign Fingerspelling Visual Breakdown Modal ── */}
      {showSpellingModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowSpellingModal(null)}
        >
          <div
            className="modal-content modal-spelling"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>🤟 ASL Fingerspelling Breakdown</h2>
                <p className="modal-subtitle">
                  Visual sign representation for "{showSpellingModal.text}"
                </p>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowSpellingModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="spelling-visual-container">
              {showSpellingModal.text
                .toUpperCase()
                .split(" ")
                .map((word, wIdx) => (
                  <div key={wIdx} className="spelling-word-block">
                    <div className="spelling-word-letters">
                      {word.split("").map((char, cIdx) => {
                        const signImg = signImages[char];
                        return (
                          <div key={cIdx} className="spelling-char-card">
                            {signImg ? (
                              <img
                                src={signImg}
                                alt={`Sign for ${char}`}
                                className="spelling-char-img"
                              />
                            ) : (
                              <div className="spelling-char-fallback">
                                {char}
                              </div>
                            )}
                            <span className="spelling-char-label">
                              {char}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <span className="spelling-word-caption">{word}</span>
                  </div>
                ))}
            </div>

            <div className="modal-actions">
              <button
                className="btn btn-speak"
                onClick={() => speakText(showSpellingModal.text)}
              >
                🔊 Speak Text
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowSpellingModal(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Phrases;
