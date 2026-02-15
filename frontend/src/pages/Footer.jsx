import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import { clearAuth, getAuth } from "../utils/auth";

const Footer = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth?.user;

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>HeritageQuest</h3>
          <p>
            {user ? `Signed in as ${user.name}` : "Discover the rich cultural heritage of India"}
          </p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/trip-planner">Trip Planner</Link>
          <Link to="/location">Track Location</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/signup">Sign Up</Link>}
          {user && (
            <button type="button" className="footer-link-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
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
