import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import StateDetails from "./pages/StateDetails";
import Quiz from "./pages/Quiz";
import Explore from "./pages/Explore";
import TripPlanner from "./pages/TripPlanner";
import LocationTracker from "./pages/LocationTracker";
import Guides from "./pages/Guides";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./pages/Footer";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/state/:id" element={<StateDetails />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/explore/:id" element={<Explore />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/location" element={<LocationTracker />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
