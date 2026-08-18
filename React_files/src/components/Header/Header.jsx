import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">🤟</span>
          <span className="logo-text">
            <span className="logo-sign">Sign</span>
            <span className="logo-bridge">Bridge</span>
          </span>
        </Link>

        <button
          className={menuOpen ? "burger open" : "burger"}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <ul className="nav-list">
            <li>
              <Link
                to="/"
                className={isActive("/") ? "nav-link active" : "nav-link"}
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
              <a
                href="/#convert"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Convert
              </a>
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
                <span>🍽️</span>
                <span>Restaurant Mode</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;