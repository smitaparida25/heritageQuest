import { useState } from "react";
import "./TripPlanner.css";
import { getAuth } from "../utils/auth";

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    duration: "",
    travelers: "",
    interests: "",
    pace: "balanced",
  });
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWarning("");
    setItinerary(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/trip/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to generate itinerary right now.");
        return;
      }

      setItinerary(data.itinerary);
      setWarning(data.warning || "");
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trip-planner">
      <div className="page-header">
        <h1>Trip Planner</h1>
        <p>
          Tell us your destination and budget, and our AI will create a personalized itinerary for you
        </p>
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
              <label>Budget (INR)</label>
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
            <div className="form-group">
              <label>Number of Travelers</label>
              <input
                type="text"
                name="travelers"
                placeholder="e.g., 2 adults"
                value={formData.travelers}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Interests</label>
              <input
                type="text"
                name="interests"
                placeholder="e.g., heritage, food, nature"
                value={formData.interests}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Travel Pace</label>
              <select name="pace" value={formData.pace} onChange={handleChange}>
                <option value="relaxed">Relaxed</option>
                <option value="balanced">Balanced</option>
                <option value="packed">Packed</option>
              </select>
            </div>
            <button type="submit" className="generate-btn" disabled={loading}>
              {loading ? "Generating..." : "Generate AI Itinerary"}
            </button>
          </form>
          {error && <p className="planner-error">{error}</p>}
          {warning && <p className="planner-warning">{warning}</p>}
        </div>

        {itinerary && (
          <div className="itinerary-section">
            <h2>Your Itinerary for {itinerary.destination}</h2>
            <p className="trip-details">
              Budget: Rs {itinerary.budget} | Duration: {itinerary.durationDays} days | Estimated Cost: Rs{" "}
              {itinerary.totalEstimatedCost}
            </p>
            <p className="itinerary-overview">{itinerary.overview}</p>

            {Array.isArray(itinerary.budgetBreakdown) && itinerary.budgetBreakdown.length > 0 && (
              <div className="budget-box">
                <h3>Budget Breakdown</h3>
                <ul>
                  {itinerary.budgetBreakdown.map((item, index) => (
                    <li key={`${item.category}-${index}`}>
                      <span>{item.category}</span>
                      <strong>Rs {item.amount}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="itinerary-days">
              {itinerary.days?.map((day) => (
                <div className="day-card" key={day.day}>
                  <h3>
                    Day {day.day}: {day.title}
                  </h3>
                  <p className="day-cost">Estimated: Rs {day.estimatedCost}</p>
                  <h4>Activities</h4>
                  <ul>
                    {day.activities?.map((item, index) => (
                      <li key={`${day.day}-act-${index}`}>{item}</li>
                    ))}
                  </ul>
                  <h4>Food</h4>
                  <ul>
                    {day.foodPlan?.map((item, index) => (
                      <li key={`${day.day}-food-${index}`}>{item}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Stay:</strong> {day.staySuggestion}
                  </p>
                  <p>
                    <strong>Transport:</strong> {day.transportNote}
                  </p>
                </div>
              ))}
            </div>

            {Array.isArray(itinerary.tips) && itinerary.tips.length > 0 && (
              <div className="tips-box">
                <h3>Smart Tips</h3>
                <ul>
                  {itinerary.tips.map((tip, idx) => (
                    <li key={`tip-${idx}`}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
