import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndiaMap } from "@vishalvoid/react-india-map";
import bg from "../assets/bg.jpg";
import plannerBg from "../assets/planner bg.jpg";
import mapBg from "../assets/map bg.jpeg";
import guideBg from "../assets/guide bg.jpg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  const mapStyle = {
    backgroundColor: "#ffffff",
    defaultColor: "#88A4BC",
    hoverColor: "#3B729F",
    stroke: "#ffffff",
    strokeWidth: 1,
    tooltipConfig: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      textColor: "#ffffff",
    },
  };

  const stateCodeMap = {
    "IN-AN": "INAN", "IN-AP": "INAP", "IN-AR": "INAR", "IN-AS": "INAS",
    "IN-BR": "INBR", "IN-CT": "INCT", "IN-GA": "INGA", "IN-GJ": "INGJ",
    "IN-HP": "INHP", "IN-HR": "INHR", "IN-JH": "INJH", "IN-JK": "INJK",
    "IN-KA": "INKA", "IN-KL": "INKL", "IN-LA": "INLA", "IN-LD": "INLD",
    "IN-MH": "INMH", "IN-ML": "INML", "IN-MN": "INMN", "IN-MP": "INMP",
    "IN-MZ": "INMZ", "IN-NL": "INNL", "IN-OR": "INOR", "IN-PB": "INPB",
    "IN-PY": "INPY", "IN-RJ": "INRJ", "IN-SK": "INSK", "IN-TG": "INTG",
    "IN-TN": "INTN", "IN-TR": "INTR", "IN-UP": "INUP", "IN-UT": "INUT",
    "IN-WB": "INWB", "IN-DL": "INDL", "IN-CH": "INCH", "IN-DN": "INDH",
  };

  const stateNames = {
    INAN: "Andaman and Nicobar", INAP: "Andhra Pradesh", INAR: "Arunachal Pradesh",
    INAS: "Assam", INBR: "Bihar", INCH: "Chandigarh", INCT: "Chhattisgarh",
    INDH: "Dadra and Nagar Haveli", INDL: "Delhi", INGA: "Goa", INGJ: "Gujarat",
    INHP: "Himachal Pradesh", INHR: "Haryana", INJH: "Jharkhand", INJK: "Jammu & Kashmir",
    INKA: "Karnataka", INKL: "Kerala", INLA: "Ladakh", INLD: "Lakshadweep",
    INMH: "Maharashtra", INML: "Meghalaya", INMN: "Manipur", INMP: "Madhya Pradesh",
    INMZ: "Mizoram", INNL: "Nagaland", INOR: "Odisha", INPB: "Punjab",
    INPY: "Puducherry", INRJ: "Rajasthan", INSK: "Sikkim", INTG: "Telangana",
    INTN: "Tamil Nadu", INTR: "Tripura", INUP: "Uttar Pradesh", INUT: "Uttarakhand",
    INWB: "West Bengal"
  };

  const handleStateClick = (stateId) => {
    const mappedState = stateCodeMap[stateId] || stateId;
    setSelectedState(mappedState);
  };

  return (
    <div className="home-container">
      <div
        className="bg"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="Heading">Know Your Roots</h1>
        <button className="explore-btn" onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}>
          Explore Now
        </button>
      </div>
      <div className="map-section" id="map-section" style={{ backgroundImage: `url(${mapBg})` }}>
        <h2>Explore Indian Heritage</h2>
        <p>Select a state to discover its cultural heritage sites</p>
        <div className="map-wrapper">
          <IndiaMap
            mapStyle={mapStyle}
            onStateClick={handleStateClick}
            onStateHover={setHoveredState}
          />
        </div>
        {hoveredState && !selectedState && (
          <div className="state-tooltip">{hoveredState}</div>
        )}
      </div>
      {selectedState && (
        <>
          <div className="cards-overlay" onClick={() => setSelectedState(null)}></div>
          <div className="cards-section">
            <button className="close-btn" onClick={() => setSelectedState(null)}>✕</button>
            <h2>{stateNames[selectedState]}</h2>
            <div className="cards-container">
              <div 
                className="heritage-card"
                onClick={() => navigate(`/quiz/${selectedState}`)}
              >
                <div className="card-icon">🎯</div>
                <h3>Track your Knowledge</h3>
                <p>From trivia to twists, how much do you really know?</p>
              </div>
              <div 
                className="heritage-card"
                onClick={() => navigate(`/explore/${selectedState}`)}
              >
                <div className="card-icon">🗺️</div>
                <h3>Explore</h3>
                <p>Discover local customs, festivals, and traditions</p>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="trip-planner-section" style={{ backgroundImage: `url(${plannerBg})` }}>
        <div className="trip-planner-content">
          <div className="trip-planner-text">
            <h2>Plan Your Trip</h2>
            <p>Enter your destination and budget, and we'll create a personalized itinerary for you</p>
            <ul className="feature-list">
              <li>Customized travel plans based on your budget</li>
              <li>Expert recommendations for places to visit</li>
              <li>Day-by-day itinerary planning</li>
            </ul>
            <button className="trip-planner-btn" onClick={() => navigate("/trip-planner")}>
              Start Planning
            </button>
          </div>
        </div>
      </div>
      <div className="guide-section" style={{ backgroundImage: `url(${guideBg})` }}>
        <div className="guide-content">
          <div className="guide-text">
            <h2>Connect with Local Guides</h2>
            <p>Get authentic travel experiences with knowledgeable local guides who know the hidden gems of India</p>
            <ul className="guide-features">
              <li>Expert local knowledge and insider tips</li>
              <li>Personalized tours tailored to your interests</li>
              <li>Authentic cultural experiences</li>
              <li>24/7 support during your trip</li>
            </ul>
            <button className="guide-btn">Find a Guide</button>
          </div>
        </div>
      </div>
      <div className="fun-facts-section">
        <h2>Fun Facts About India</h2>
        <div className="facts-grid">
          <div className="fact-card">
            <div className="fact-icon">🏰</div>
            <h3>World's Largest Postal Network</h3>
            <p>India has the world's largest postal network with over 150,000 post offices.</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">🎬</div>
            <h3>Bollywood</h3>
            <p>India produces the largest number of films in the world, with over 1,800 movies annually.</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">🕉️</div>
            <h3>Birthplace of Yoga</h3>
            <p>Yoga originated in India over 5,000 years ago and is practiced worldwide today.</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">🌶️</div>
            <h3>Spice Basket</h3>
            <p>India is the largest producer, consumer, and exporter of spices in the world.</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">🏏</div>
            <h3>Cricket Crazy</h3>
            <p>Cricket is the most popular sport in India with over 1 billion fans.</p>
          </div>
          <div className="fact-card">
            <div className="fact-icon">🗿</div>
            <h3>UNESCO Heritage</h3>
            <p>India has 40 UNESCO World Heritage Sites, the most in any country.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
