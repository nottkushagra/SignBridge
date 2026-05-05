import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>🤟</span>
            <span>Sign<strong>Bridge</strong></span>
          </Link>
          <p className="footer-tagline">
            Universal Sign Language Assistant — breaking communication barriers,
            one sign at a time.
          </p>
        </div>

        <div className="footer-nav">
          <p className="footer-heading">Navigation</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/learn">Learn</Link></li>
            <li><Link to="/learn">Practice</Link></li>
            <li><a href="/#convert">Convert</a></li>
            <li><a href="/#restaurant">Restaurant Mode</a></li>
          </ul>
        </div>

        <div className="footer-cta">
          <p className="footer-heading">Get Started</p>
          <p>Ready to bridge the gap?</p>
          <Link to="/learn" className="footer-btn">Start Learning →</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 SignBridge. Made with ❤️ for accessibility.</p>
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