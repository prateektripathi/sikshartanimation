// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import RippleEffect from "./components/RippleEffect";
import Prize from "./components/Prize";
import PrizeTracks from "./components/PrizeTracks";
import HackathonSection from "./components/HackathonSection";
import Preloader from "./components/Preloader";
import Benefits from "./components/Benefits";
import Calltoaction from "./components/Calltoaction";
import Register from "./components/register";
import FAQ from "./components/FAQ";
import Login from "./components/Login";
import Sponsors from "./components/Sponsors";
import Events from "./components/Events";
import LearnMore from "./components/Learnmore";
import Footer from "./components/Footer";
import Guidelines from "./components/Guidelines";
import Speakers from "./components/Speakers";
import LogOut from "./components/LogOut";
import ScrollingBackdrop from "./components/ScrollingBackdrop";
import StatsShowcase from "./components/StatsShowcase";
import RefundPolicy from "./components/Refundpolicy";
import EventsPage from "./components/eventpage";
import EventDetails from "./components/Detailregister";
import ContactForm from "./components/contactdetail";
import HackathonRegistrationForm from "./components/HackathonRegistrationForm";
import Chatbot from "./components/chatbot";
import img from "../public/download.png";
import "./App.css";

// Floating Chatbot component
const FloatingChatbot = () => {
  const location = useLocation();

  // Hide icon if user is on /chatbot route
  if (location.pathname === "/chatbot") return null;

  return (
    <NavLink to="/chatbot">
      <img
        src={img} // apna chatbot icon yaha dalna (public folder me rakh dena)
        alt="Chatbot"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          zIndex: 9999,
        }}
        className="rounded-[50%]"
      />
    </NavLink>
  );
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BrowserRouter>
      {!isLoaded && <Preloader setIsLoaded={setIsLoaded} />}
      {isLoaded && (
        <>
          <RippleEffect />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Benefits />
                  <Prize />
                  <PrizeTracks />
                  <HackathonSection />
                  <Calltoaction />
                  <ScrollingBackdrop />
                  <StatsShowcase />
                  <FAQ />
                  <Footer />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/events" element={<Events />} />
            <Route path="/speakers" element={<Speakers />} />
            <Route path="/register" element={<Register />} />
            <Route path="/event" element={<EventsPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/refundpolicy" element={<RefundPolicy />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/learnmore" element={<LearnMore />} />
            <Route path="/eventdetail/:id" element={<EventDetails />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route
              path="/eventdetail/:id/eventregistration"
              element={<HackathonRegistrationForm />}
            />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>

          {/* Floating Chatbot Icon */}
          <FloatingChatbot />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
