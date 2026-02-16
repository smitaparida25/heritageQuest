import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GuideDashboard.css";
import { getAuth, saveGuideProfile } from "../utils/auth";

const GuideDashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth?.user?.name || "",
    location: "",
    experience: "",
    languages: "",
    specialty: "",
    price: "",
    description: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!auth || !auth.user) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <h1>Guide Dashboard</h1>
          <p>Please login to access your guide dashboard.</p>
          <button onClick={() => navigate("/login")} className="dashboard-btn">Login</button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const guideData = {
        ...formData,
        userId: auth.user.id,
        email: auth.user.email,
        languages: formData.languages.split(",").map(l => l.trim()),
      };

      saveGuideProfile(guideData);
      setMessage("Profile saved successfully!");
      setTimeout(() => navigate("/guides"), 1500);
    } catch (error) {
      setMessage("Error saving profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Guide Dashboard</h1>
          <p>Create your guide profile to start receiving bookings</p>
        </div>

        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Location (City, State)</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Jaipur, Rajasthan"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Professional Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label>Price per Day (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 2500"
                  min="500"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Specialty</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                placeholder="e.g., Historical Forts & Palaces, Temple Tours, Wildlife"
                required
              />
            </div>
            <div className="form-group">
              <label>Languages (comma separated)</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="e.g., English, Hindi, Rajasthani"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>About You</h3>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell travelers about yourself, your experience, and what makes your tours unique..."
                rows="5"
              ></textarea>
            </div>
          </div>

          {message && <div className="message">{message}</div>}

          <button type="submit" className="dashboard-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuideDashboard;
