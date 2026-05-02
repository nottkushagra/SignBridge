import "./Footer.css";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Learn", href: "#learn" },
  { label: "Practice", href: "#practice" },
  { label: "Convert", href: "#convert" },
  { label: "Restaurant Mode", href: "#restaurant" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Accessibility", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <span aria-hidden="true">🤟</span>
            <span>Sign<strong>Bridge</strong></span>
          </a>
          <p className="footer__tagline">
            Universal Sign Language Assistant — breaking communication barriers,
            one sign at a time.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <p className="footer__nav-heading">Navigation</p>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="footer__link">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__cta">
          <p className="footer__nav-heading">Get Started</p>
          <p className="footer__cta-text">Ready to bridge the gap?</p>
          <a href="#learn" className="btn btn--primary footer__cta-btn">
            Start Learning →
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© {year} SignBridge. Made with ❤️ for accessibility.</p>
        <ul className="footer__legal">
          {legalLinks.map((l) => (
            <li key={l.label}><a href={l.href} className="footer__link">{l.label}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}