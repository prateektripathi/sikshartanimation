// src/components/StatsShowcase.jsx
import React from "react";
import "./StatsShowcase.css";

const stats = [
  {
    number: "50000+",
    description:
      "Attendees gathered at E-Summit, making it one of the largest student-run entrepreneurial congregations in Asia",
  },
  {
    number: "1000+",
    description:
      "Startups associated with us, driving innovation and shaping the entrepreneurial ecosystem",
  },
  {
    number: "30+",
    description:
      "Events of E-Summit, bringing together knowledge, experience, and enthusiasm",
  },
];

const StatsShowcase = () => {
  return (
    <section className="stats-section blue-theme">
      <div className="logo-container">
        <div className="globe">
          <div className="central-sphere"></div>

          {/* Orbit layers with rotating spheres */}
          <div className="orbit orbit1">
            <div className="orbiting-sphere"></div>
          </div>
          <div className="orbit orbit2">
            <div className="orbiting-sphere"></div>
          </div>
          <div className="orbit orbit3">
            <div className="orbiting-sphere"></div>
          </div>
          <div className="orbit orbit4">
            <div className="orbiting-sphere"></div>
          </div>
          <div className="orbit orbit5">
            <div className="orbiting-sphere"></div>
          </div>
          <div className="orbit orbit6">
            <div className="orbiting-sphere"></div>
          </div>
        </div>
      </div>

      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div className="stat-block" key={idx}>
            <h1 className="stat-number">{stat.number}</h1>
            <p className="stat-description">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsShowcase;
