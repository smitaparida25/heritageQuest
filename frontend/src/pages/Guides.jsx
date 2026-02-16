import "./Guides.css";
import { getAuth, getGuideProfile, getApprovedGuideProfiles } from "../utils/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultGuidesData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Jaipur, Rajasthan",
    experience: "15 years",
    languages: ["English", "Hindi", "Rajasthani"],
    specialty: "Historical Forts & Palaces",
    rating: 4.9,
    image: "👨‍💼",
    price: "₹2,500/day"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Varanasi, Uttar Pradesh",
    experience: "8 years",
    languages: ["English", "Hindi", "Bhojpuri"],
    specialty: "Temples & Spiritual Tours",
    rating: 4.8,
    image: "👩‍💼",
    price: "₹2,000/day"
  },
  {
    id: 3,
    name: "Mohammed Ali",
    location: "Goa",
    experience: "12 years",
    languages: ["English", "Hindi", "Konkani", "Portuguese"],
    specialty: "Beach Tours & Heritage Churches",
    rating: 4.7,
    image: "👨‍💼",
    price: "₹1,800/day"
  },
];

const Guides = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [profileStatus, setProfileStatus] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const profile = getGuideProfile();
    if (profile) {
      setMyProfile(profile);
      setProfileStatus(profile.status);
    }
  }, []);

  const approvedGuides = getApprovedGuideProfiles();
  
  const approvedGuidesFormatted = approvedGuides.map((g, i) => ({
    id: `approved-${i}`,
    name: g.name,
    location: g.location,
    experience: `${g.experience} years`,
    languages: g.languages,
    specialty: g.specialty,
    rating: "New",
    image: "🧑‍🏫",
    price: `₹${g.price}/day`,
    description: g.description,
    isVerified: true
  }));

  let guidesData = [...approvedGuidesFormatted, ...defaultGuidesData];

  if (myProfile && profileStatus === "pending") {
    guidesData = [
      {
        id: "my-profile-pending",
        name: myProfile.name,
        location: myProfile.location,
        experience: `${myProfile.experience} years`,
        languages: myProfile.languages,
        specialty: myProfile.specialty,
        rating: "New",
        image: "🧑‍🏫",
        price: `₹${myProfile.price}/day`,
        description: myProfile.description,
        isOwnProfile: true,
        isPending: true
      },
      ...guidesData
    ];
  }
  return (
    <div className="guides-page">
      <div className="guides-header">
        <h1>Local Guides</h1>
        <p>Connect with experienced local guides for authentic travel experiences</p>
        <a href="/admin" style={{ fontSize: '0.8rem', color: '#999', textDecoration: 'none' }}>Admin</a>
      </div>
      <div className="guides-grid">
        {guidesData.map((guide) => (
          <div key={guide.id} className="guide-card">
            <div className="guide-image">{guide.image}</div>
            <div className="guide-info">
              <h3>
                {guide.name}
                {guide.isVerified && <span className="verified-badge">✓ Verified</span>}
                {guide.isOwnProfile && guide.isPending && <span className="pending-badge">Pending</span>}
              </h3>
              <p className="guide-location">📍 {guide.location}</p>
              <p className="guide-experience">💼 {guide.experience} experience</p>
              <p className="guide-specialty">🎯 {guide.specialty}</p>
              <div className="guide-languages">
                {guide.languages.map((lang, index) => (
                  <span key={index} className="language-tag">{lang}</span>
                ))}
              </div>
              <div className="guide-footer">
                <div className="guide-rating">⭐ {guide.rating}</div>
                <div className="guide-price">{guide.price}</div>
              </div>
              {guide.description && <p className="guide-description">{guide.description}</p>}
              {guide.isPending ? (
                <div className="pending-message">⏳ Your profile is under review</div>
              ) : (
                <button 
                  className="contact-btn"
                  onClick={() => {
                    if (guide.isOwnProfile) {
                      navigate("/guide-dashboard");
                    } else {
                      alert("Contact feature coming soon!");
                    }
                  }}
                >
                  {guide.isOwnProfile ? "Edit Profile" : "Contact Guide"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;
