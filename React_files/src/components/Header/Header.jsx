import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span>🤟</span>
          <span>Sign<strong>Bridge</strong></span>
        </Link>

        <button
          className={menuOpen ? "burger open" : "burger"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <ul className="nav-list">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/learn" onClick={() => setMenuOpen(false)}>Learn</Link></li>
            <li><Link to="/learn" onClick={() => setMenuOpen(false)}>Practice</Link></li>
            <li><a href="/#convert" onClick={() => setMenuOpen(false)}>Convert</a></li>
            <li>
              <Link to="/#restaurant" className="nav-special" onClick={() => setMenuOpen(false)}>
                Restaurant Mode
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;