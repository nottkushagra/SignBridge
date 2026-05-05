import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Learn", to: "/learn" },
  { label: "Practice", to: "/learn" },
  { label: "Convert", to: "/#convert" },
  { label: "Restaurant Mode", to: "/#restaurant", special: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon" aria-hidden="true">🤟</span>
          <span className="header__logo-text">Sign<strong>Bridge</strong></span>
        </Link>

        <button
          className={`header__burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`} aria-label="Main navigation">
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`header__nav-link ${link.special ? "header__nav-link--special" : ""} ${location.pathname === link.to ? "header__nav-link--active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}