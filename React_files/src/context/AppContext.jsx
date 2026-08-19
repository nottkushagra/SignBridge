import { useState, useEffect } from "react";
import { AppContext } from "./createAppContext";
import { INITIAL_PHRASES } from "./constants";

export function AppProvider({ children }) {
  // 1. Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("signbridge-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("signbridge-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 2. Role-Based Mode ("deaf" | "hearing")
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("signbridge-role") || "deaf";
  });

  useEffect(() => {
    localStorage.setItem("signbridge-role", userRole);
  }, [userRole]);

  // 3. Multi-Language Selection
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("signbridge-language") || "en-US";
  });

  useEffect(() => {
    localStorage.setItem("signbridge-language", language);
  }, [language]);

  // 4. Custom Phrase Builder
  const [phrases, setPhrases] = useState(() => {
    try {
      const stored = localStorage.getItem("signbridge-phrases");
      return stored ? JSON.parse(stored) : INITIAL_PHRASES;
    } catch {
      return INITIAL_PHRASES;
    }
  });

  useEffect(() => {
    localStorage.setItem("signbridge-phrases", JSON.stringify(phrases));
  }, [phrases]);

  const addPhrase = (newPhrase) => {
    const phraseObj = {
      id: "phrase-" + (phrases.length + 1) + "-" + Date.now(),
      text: newPhrase.text.trim(),
      category: newPhrase.category || "General",
      emoji: newPhrase.emoji || "💬",
      favorite: !!newPhrase.favorite,
      quickAudio: !!newPhrase.quickAudio,
      createdAt: new Date().toISOString(),
    };
    setPhrases((prev) => [phraseObj, ...prev]);
    return phraseObj;
  };

  const updatePhrase = (id, updatedFields) => {
    setPhrases((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deletePhrase = (id) => {
    setPhrases((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleFavoritePhrase = (id) => {
    setPhrases((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  const resetPhrases = () => {
    setPhrases(INITIAL_PHRASES);
  };

  // 5. Speech Synthesis Helper with Language Support
  const speakText = (text, customLang = language) => {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = customLang;
    utterance.rate = 0.9;
    
    // Attempt matching system voice for language
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang === customLang || v.lang.startsWith(customLang.split("-")[0]));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
    
    window.speechSynthesis.speak(utterance);

    // Save to history automatically
    try {
      const history = JSON.parse(localStorage.getItem("signbridge-history") || "[]");
      const entryId = "hist-" + (history.length + 1) + "-" + Date.now();
      history.unshift({
        id: entryId,
        type: "text-to-speech",
        content: text,
        lang: customLang,
        timestamp: new Date().toISOString(),
      });
      if (history.length > 100) history.length = 100;
      localStorage.setItem("signbridge-history", JSON.stringify(history));
    } catch (err) {
      console.warn("Could not save to history:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        userRole,
        setUserRole,
        language,
        setLanguage,
        phrases,
        addPhrase,
        updatePhrase,
        deletePhrase,
        toggleFavoritePhrase,
        resetPhrases,
        speakText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
