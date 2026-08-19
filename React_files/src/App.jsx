import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Learn from "./pages/Learn/Learn";
import Practice from "./pages/Practice/Practice";
import Phrases from "./pages/Phrases/Phrases";
import Restaurant from "./pages/Restaurant/Restaurant";
import History from "./pages/History/History";
import "./App.css";

function ScrollToHashOrTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return;
      }
    }
    // Default to top if no hash
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  const basePath = import.meta.env.BASE_URL || "/SignBridge/";

  return (
    <AppProvider>
      <BrowserRouter basename={basePath}>
        <ScrollToHashOrTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/phrases" element={<Phrases />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/history" element={<History />} />
            {/* Fallback route directly to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
