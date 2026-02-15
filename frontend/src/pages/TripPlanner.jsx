import { useState } from "react";
import "./TripPlanner.css";

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    duration: "",
  });
  const [itinerary, setItinerary] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItinerary({
      destination: formData.destination,
      budget: formData.budget,
      duration: formData.duration,
      day1: ["Visit main attraction", "Lunch at local restaurant", "Explore local market"],
      day2: ["Heritage site visit", "Cultural experience", "Dinner with local cuisine"],
    });
  };

  return (
    <div className="trip-planner">
      <div className="page-header">
        <h1>Trip Planner</h1>
        <p>Tell us your destination and budget, and we'll create a personalized itinerary for you</p>
      </div>

      <div className="planner-content">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="planner-form">
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                placeholder="e.g., Rajasthan, Kerala, Goa"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Budget (₹)</label>
              <input
                type="number"
                name="budget"
                placeholder="e.g., 50000"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Duration (days)</label>
              <input
                type="number"
                name="duration"
                placeholder="e.g., 5"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="generate-btn">
              Generate Itinerary
            </button>
          </form>
        </div>

        {itinerary && (
          <div className="itinerary-section">
            <h2>Your Itinerary for {itinerary.destination}</h2>
            <p className="trip-details">Budget: ₹{itinerary.budget} | Duration: {itinerary.duration} days</p>
            
            <div className="itinerary-days">
              <div className="day-card">
                <h3>Day 1</h3>
                <ul>
                  {itinerary.day1.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="day-card">
                <h3>Day 2</h3>
                <ul>
                  {itinerary.day2.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
