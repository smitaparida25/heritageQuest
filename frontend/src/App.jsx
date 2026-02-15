import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import StateDetails from "./pages/StateDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/state/:id" element={<StateDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
