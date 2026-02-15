import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndiaMap } from "@vishalvoid/react-india-map";
import bg from "../assets/bg.jpg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
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

  const handleStateClick = (stateId) => {
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
    const mappedState = stateCodeMap[stateId] || stateId;
    navigate(`/state/${mappedState}`);
  };

  return (
    <div className="home-container">
      <div
        className="bg"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="Heading">Know Your Roots</h1>
      </div>
      <div className="map-section">
        <h2>Explore Indian Heritage</h2>
        <p>Select a state to discover its cultural heritage sites</p>
        <div className="map-wrapper">
          <IndiaMap
            mapStyle={mapStyle}
            onStateClick={handleStateClick}
            onStateHover={setHoveredState}
          />
        </div>
        {hoveredState && (
          <div className="state-tooltip">{hoveredState}</div>
        )}
      </div>
    </div>
  );
};

export default Home;
