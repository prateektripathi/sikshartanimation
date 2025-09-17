import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/Authcontext"; // ✅ Updated
import { useScrambleText } from "./useScrambleText";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { usertoken, logoutuser, loading } = useAuth(); // ✅ cleaner
  const navigate = useNavigate();

  const [ctaText1, scrambleCta1] = useScrambleText("LOGIN");
  const [logoutText, scrambleLogout] = useScrambleText("LOGOUT");
  const [nav1, scrambleNav1] = useScrambleText("HOME");
  const [nav2, scrambleNav2] = useScrambleText("EVENTS");
  const [nav3, scrambleNav3] = useScrambleText("FAQ");
  const [nav4, scrambleNav4] = useScrambleText("CONTACT");

  const handleLogout = () => {
    logoutuser();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/" onClick={() => setMenuOpen(false)}></NavLink>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <li onMouseEnter={scrambleNav1}>{nav1}</li>
        </NavLink>
        <NavLink to="/event" onClick={() => setMenuOpen(false)}>
          <li onMouseEnter={scrambleNav2}>{nav2}</li>
        </NavLink>
        <NavLink to="/faq" onClick={() => setMenuOpen(false)}>
          <li onMouseEnter={scrambleNav3}>{nav3}</li>
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          <li onMouseEnter={scrambleNav4}>{nav4}</li>
        </NavLink>

        {/* Mobile View - Login/Logout */}
        {!loading && (
          menuOpen &&
          (usertoken ? (
            <li
              className="mobile-auth"
              onClick={handleLogout}
              onMouseEnter={scrambleLogout}
            >
              {logoutText}
            </li>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              <li className="mobile-auth" onMouseEnter={scrambleCta1}>
                {ctaText1}
              </li>
            </NavLink>
          ))
        )}
      </ul>

      {/* Desktop View - Login/Logout */}
      {!loading && (
        usertoken ? (
          <button
            className="register-btn desktop-login"
            onClick={handleLogout}
            onMouseEnter={scrambleLogout}
          >
            {logoutText}
          </button>
        ) : (
          <NavLink to="/login" className="desktop-login">
            <button className="register-btn" onMouseEnter={scrambleCta1}>
              {ctaText1}
            </button>
          </NavLink>
        )
      )}

      {/* Hamburger Menu */}
      <div
        className={`menu-icon ${menuOpen ? "inside-menu" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
