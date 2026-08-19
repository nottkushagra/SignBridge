import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../context/useApp";
import { SunIcon, MoonIcon, DiningIcon, HandSignIcon } from "../Icons/Icons";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, userRole, setUserRole } = useApp();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon"><HandSignIcon size={16} /></span>
          <span className="logo-text">
            <span className="logo-sign">Sign</span>
            <span className="logo-bridge">Bridge</span>
          </span>
        </Link>

        {/* Global Controls: Role Switcher & Theme Toggle */}
        <div className="header-controls-group">
          <div className="role-switcher" role="radiogroup" aria-label="User Mode">
            <button
              className={`role-btn ${userRole === "deaf" ? "active" : ""}`}
              onClick={() => setUserRole("deaf")}
              title="Deaf / Hard of Hearing User Mode (Visual cues & instant text phrases)"
            >
              <span className="role-icon"><HandSignIcon size={16} /></span>
              <span className="role-label">Deaf</span>
            </button>
            <button
              className={`role-btn ${userRole === "hearing" ? "active" : ""}`}
              onClick={() => setUserRole("hearing")}
              title="Hearing User Mode (Voice readout & sign recognition)"
            >
              <span className="role-icon">👂</span>
              <span className="role-label">Hearing</span>
            </button>
          </div>

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>

          <button
            className={menuOpen ? "burger open" : "burger"}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <ul className="nav-list">
            <li>
              <Link
                to="/"
                className={isActive("/") && location.hash !== "#convert" ? "nav-link active" : "nav-link"}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/learn"
                className={isActive("/learn") ? "nav-link active" : "nav-link"}
                onClick={() => setMenuOpen(false)}
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                to="/practice"
                className={isActive("/practice") ? "nav-link active" : "nav-link"}
                onClick={() => setMenuOpen(false)}
              >
                Practice
              </Link>
            </li>
            <li>
              <Link
                to="/phrases"
                className={isActive("/phrases") ? "nav-link active" : "nav-link"}
                onClick={() => setMenuOpen(false)}
              >
                Phrases
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "/", hash: "#convert" }}
                className={location.pathname === "/" && location.hash === "#convert" ? "nav-link active" : "nav-link"}
                onClick={() => setMenuOpen(false)}
              >
                Convert
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className={isActive("/history") ? "nav-link active" : "nav-link"}
                onClick={() => setMenuOpen(false)}
              >
                History
              </Link>
            </li>
            <li>
              <Link
                to="/restaurant"
                className="nav-restaurant"
                onClick={() => setMenuOpen(false)}
              >
                <DiningIcon size={15} />
                <span>Restaurant</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;