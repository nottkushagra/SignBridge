import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./History.css";

const typeBadges = {
  "speech-to-text": { label: "Speech → Text", emoji: "🎙️", color: "var(--brand-blue)" },
  "text-to-speech": { label: "Text → Speech", emoji: "🗣️", color: "var(--lavender-deep)" },
  "restaurant-order": { label: "Restaurant", emoji: "🍽️", color: "var(--rose-deep)" },
};

function History() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    loadHistory();
  }, []);

  function loadHistory() {
    try {
      const data = JSON.parse(localStorage.getItem("signbridge-history") || "[]");
      setHistory(data);
    } catch {
      setHistory([]);
    }
  }

  function clearHistory() {
    localStorage.removeItem("signbridge-history");
    setHistory([]);
  }

  function deleteEntry(id) {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("signbridge-history", JSON.stringify(updated));
  }

  function exportHistory() {
    const text = history
      .map((h) => {
        const badge = typeBadges[h.type] || { label: h.type, emoji: "📝" };
        const date = new Date(h.timestamp).toLocaleString();
        return `[${date}] ${badge.emoji} ${badge.label}: ${h.content}`;
      })
      .join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "signbridge-history.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = history.filter((h) => {
    const matchType = filterType === "all" || h.type === filterType;
    const matchSearch =
      !searchQuery ||
      h.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  function formatTime(timestamp) {
    const d = new Date(timestamp);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="history-page">
      {/* Hero */}
      <div className="history-hero">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Conversation History</h1>
        <p>A quiet log of your past translations, orders, and interactions.</p>
      </div>

      <div className="history-section">
        {/* Controls */}
        <div className="history-controls">
          <input
            type="text"
            placeholder="Search through past conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="history-search"
            aria-label="Search history"
          />
          <div className="history-filters">
            <button
              className={filterType === "all" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilterType("all")}
            >
              All Types
            </button>
            {Object.entries(typeBadges).map(([key, val]) => (
              <button
                key={key}
                className={filterType === key ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilterType(key)}
              >
                {val.emoji} {val.label}
              </button>
            ))}
          </div>
          <div className="history-actions">
            {history.length > 0 && (
              <>
                <button className="btn btn-outline" onClick={exportHistory}>
                  📥 Export TXT
                </button>
                <button className="btn btn-outline history-clear-btn" onClick={clearHistory}>
                  🗑️ Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Timeline */}
        {filtered.length === 0 ? (
          <div className="history-empty">
            <span className="history-empty-emoji">📭</span>
            <h3>No recorded history yet</h3>
            <p>
              {history.length === 0
                ? "Use the Live Converter or Restaurant Mode to build your communication history."
                : "No saved items match your active search or filter."}
            </p>
            {history.length === 0 && (
              <Link to="/#convert" className="btn btn-primary history-cta-btn">
                Open Live Converter
              </Link>
            )}
          </div>
        ) : (
          <div className="history-timeline">
            {filtered.map((entry) => {
              const badge = typeBadges[entry.type] || {
                label: entry.type,
                emoji: "📝",
                color: "var(--brand-blue)",
              };
              return (
                <div className="history-card" key={entry.id}>
                  <div className="history-card-top">
                    <span className="history-type-badge">
                      <span className="badge-emoji">{badge.emoji}</span>
                      <span>{badge.label}</span>
                    </span>
                    <span className="history-time">{formatTime(entry.timestamp)}</span>
                  </div>
                  <p className="history-content">{entry.content}</p>
                  <button
                    className="history-delete"
                    onClick={() => deleteEntry(entry.id)}
                    aria-label="Delete entry"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
