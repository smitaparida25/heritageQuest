import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./LocationTracker.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          setError("Unable to get location. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError("Unable to get location. Please enable location services.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="location-tracker">
      <div className="tracker-header">
        <h1>Track Your Location</h1>
        <p>View your current location on the map</p>
      </div>

      <div className="tracker-content">
        <div className="map-container">
          {loading ? (
            <div className="loading">Loading map...</div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button onClick={getCurrentLocation} className="retry-btn">
                Try Again
              </button>
            </div>
          ) : location ? (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[location.lat, location.lng]}>
                <Popup>You are here!</Popup>
              </Marker>
            </MapContainer>
          ) : null}
        </div>

        <div className="location-info">
          <h2>Your Location</h2>
          {location ? (
            <>
              <p><strong>Latitude:</strong> {location.lat.toFixed(6)}</p>
              <p><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
              <button onClick={getCurrentLocation} className="refresh-btn">
                Refresh Location
              </button>
            </>
          ) : (
            <p>Location not available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationTracker;
