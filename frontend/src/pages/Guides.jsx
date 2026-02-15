import "./Guides.css";

const guidesData = [
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
  return (
    <div className="guides-page">
      <div className="guides-header">
        <h1>Local Guides</h1>
        <p>Connect with experienced local guides for authentic travel experiences</p>
      </div>
      <div className="guides-grid">
        {guidesData.map((guide) => (
          <div key={guide.id} className="guide-card">
            <div className="guide-image">{guide.image}</div>
            <div className="guide-info">
              <h3>{guide.name}</h3>
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
              <button className="contact-btn">Contact Guide</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;
