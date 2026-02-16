import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { getPendingGuideProfiles, getApprovedGuideProfiles, approveGuideProfile, rejectGuideProfile } from "../utils/auth";

const AdminDashboard = () => {
  const [pendingGuides, setPendingGuides] = useState([]);
  const [approvedGuides, setApprovedGuides] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = () => {
    setPendingGuides(getPendingGuideProfiles());
    setApprovedGuides(getApprovedGuideProfiles());
  };

  const handleApprove = (email) => {
    approveGuideProfile(email);
    loadGuides();
    alert("Guide approved successfully!");
  };

  const handleReject = (email) => {
    if (confirm("Are you sure you want to reject this guide?")) {
      rejectGuideProfile(email);
      loadGuides();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Verify and manage guide profiles</p>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Requests ({pendingGuides.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === "approved" ? "active" : ""}`}
            onClick={() => setActiveTab("approved")}
          >
            Approved Guides ({approvedGuides.length})
          </button>
        </div>

        {activeTab === "pending" && (
          <div className="guides-list">
            {pendingGuides.length === 0 ? (
              <div className="empty-state">
                <p>No pending guide requests</p>
              </div>
            ) : (
              pendingGuides.map((guide, index) => (
                <div key={index} className="guide-request-card">
                  <div className="guide-request-header">
                    <span className="status-badge pending">Pending</span>
                    <span className="date">{new Date(guide.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="guide-request-body">
                    <h3>{guide.name}</h3>
                    <p className="guide-email">{guide.email}</p>
                    <p className="guide-location">📍 {guide.location}</p>
                    <p className="guide-specialty">🎯 {guide.specialty}</p>
                    <p className="guide-experience">💼 {guide.experience} years experience</p>
                    <p className="guide-price">💰 ₹{guide.price}/day</p>
                    <div className="guide-languages">
                      {guide.languages.map((lang, i) => (
                        <span key={i} className="language-tag">{lang}</span>
                      ))}
                    </div>
                    {guide.description && (
                      <p className="guide-description">📝 {guide.description}</p>
                    )}
                  </div>
                  <div className="guide-request-actions">
                    <button 
                      className="approve-btn"
                      onClick={() => handleApprove(guide.email)}
                    >
                      ✅ Approve
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleReject(guide.email)}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "approved" && (
          <div className="guides-list">
            {approvedGuides.length === 0 ? (
              <div className="empty-state">
                <p>No approved guides yet</p>
              </div>
            ) : (
              approvedGuides.map((guide, index) => (
                <div key={index} className="guide-request-card">
                  <div className="guide-request-header">
                    <span className="status-badge approved">Approved</span>
                    <span className="date">Approved: {new Date(guide.approvedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="guide-request-body">
                    <h3>{guide.name}</h3>
                    <p className="guide-email">{guide.email}</p>
                    <p className="guide-location">📍 {guide.location}</p>
                    <p className="guide-specialty">🎯 {guide.specialty}</p>
                    <p className="guide-experience">💼 {guide.experience} years experience</p>
                    <p className="guide-price">💰 ₹{guide.price}/day</p>
                    <div className="guide-languages">
                      {guide.languages.map((lang, i) => (
                        <span key={i} className="language-tag">{lang}</span>
                      ))}
                    </div>
                    {guide.description && (
                      <p className="guide-description">📝 {guide.description}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
