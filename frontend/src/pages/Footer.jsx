import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>HeritageQuest</h3>
          <p>Discover the rich cultural heritage of India</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/trip-planner">Trip Planner</Link>
          <Link to="/location">Track Location</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-social">
          <a href="#" className="social-icon" aria-label="Facebook">f</a>
          <a href="#" className="social-icon" aria-label="Twitter">t</a>
          <a href="#" className="social-icon" aria-label="Instagram">i</a>
          <a href="#" className="social-icon" aria-label="YouTube">y</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 HeritageQuest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
