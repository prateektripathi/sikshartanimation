import React from "react";
import "./Prize.css";

const Prize = () => {
  return (
    <section className="prize-section">
      <p className="prize-subtitle">WIN UP TO</p>

      <div className="scrolling-wrapper">
        <div className="scrolling-track">
          <div className="scrolling-text">
            ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND •
          </div>
          <div className="scrolling-text">
                       ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND • ₹50,000 + FIFTY THOUSAND •
          </div>
        </div>
        <div className="scanlines"></div>
      </div>

      <p className="prize-subtitle">IN PRIZES</p>
    </section>
  );
};

export default Prize;
