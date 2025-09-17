import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideNavbar.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Sponsors", path: "/sponsors" },
  { label: "Events", path: "/events" },
  { label: "Speakers", path: "/speakers" },
  { label: "Contact Us", path: "/contact" },
];

const SideNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hamburger" onClick={() => setOpen(!open)}>
        &#9776;
      </div>

      <div className={`side-navbar ${open ? "open" : ""}`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={() => setOpen(false)} // close sidebar on link click
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideNavbar;
