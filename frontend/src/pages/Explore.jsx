import { useParams } from "react-router-dom";
import "./Explore.css";

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

const Explore = () => {
  const { id } = useParams();
  const stateName = stateNames[id] || "State";

  return (
    <div className="explore-page">
      <div className="page-header">
        <h1>Explore - {stateName}</h1>
        <p>Discover culture, traditions, and heritage of {stateName}</p>
      </div>
      <div className="sections-container">
        <div className="explore-section">
          <div className="section-icon">🏛️</div>
          <h2>Heritage Sites</h2>
          <p>Explore historical monuments, temples, forts, and cultural landmarks of {stateName}.</p>
        </div>
        <div className="explore-section">
          <div className="section-icon">🎭</div>
          <h2>Cultures & Traditions</h2>
          <p>Discover local customs, festivals, folk dances, music, and traditional practices of {stateName}.</p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
