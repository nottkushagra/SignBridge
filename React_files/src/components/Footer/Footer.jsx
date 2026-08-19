import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-icon">🤟</span>
            <span className="logo-text">
              <span className="logo-sign">Sign</span>
              <span className="logo-bridge">Bridge</span>
            </span>
          </Link>
          <p className="footer-tagline">
            Universal Sign Language Assistant — breaking communication barriers
            through thoughtful, accessible technology.
          </p>
        </div>

        <div className="footer-nav">
          <p className="footer-heading">Navigation</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/learn">Learn</Link></li>
            <li><Link to="/practice">Practice</Link></li>
            <li><Link to="/phrases">Phrase Builder</Link></li>
            <li><Link to={{ pathname: "/", hash: "#convert" }}>Convert</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/restaurant">Restaurant Mode</Link></li>
          </ul>
        </div>

        <div className="footer-cta">
          <p className="footer-heading">Get Started</p>
          <p>Ready to bridge the communication gap?</p>
          <Link to="/learn" className="btn btn-primary footer-btn">
            Start Learning →
          </Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 SignBridge. Designed for human connection & accessibility.</p>
        <ul className="footer-legal">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Accessibility</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;