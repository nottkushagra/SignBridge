import { useState } from "react";
import "./Header.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Learn", href: "#learn" },
  { label: "Practice", href: "#practice" },
  { label: "Convert", href: "#convert" },
  { label: "Restaurant Mode", href: "#restaurant" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#home" className="header__logo">
          <span className="header__logo-icon" aria-hidden="true">🤟</span>
          <span className="header__logo-text">Sign<strong>Bridge</strong></span>
        </a>

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
                <a
                  href={link.href}
                  className={`header__nav-link ${link.label === "Restaurant Mode" ? "header__nav-link--special" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}