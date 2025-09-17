import React, { useState, useEffect } from "react";
import "./PrizeTracks.css"; // make sure this file exists
import { auth, BASE_URL } from "../data/allapi";

const PrizeBenefits = () => {
  const [benefitsData, setBenefitsData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response = await fetch(`${BASE_URL}${auth.getallbenefits}`); // ⬅ Replace this
        const data = await response.json();
        setBenefitsData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching benefits:", error);
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) {
    return <div className="tracks-section">Loading...</div>;
  }

  if (!benefitsData.length) {
    return <div className="tracks-section">No data found.</div>;
  }

  return (
    <section className="tracks-section">
      <h2 className="tracks-title">Participant Benefits</h2>
      <div className="tracks-container">
        {/* LEFT PANEL */}
        <div className="tracks-sidebar">
          {benefitsData.map((item, index) => (
            <div
              key={item._id || index}
              className={`track-tab ${selected === index ? "active" : ""}`}
              onClick={() => setSelected(index)}
            >
              <p className="label">{item.title?.toUpperCase()}</p>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="track-details">
          <h3 className="track-name">{benefitsData[selected].title}</h3>
          <p className="track-desc">{benefitsData[selected].benefit}</p>
          <hr />
          <div className="track-prize">
            <p className="label">DESCRIPTION</p>
            <p className="desc">{benefitsData[selected].description}</p>
          </div>

          {/* <div className="devfolio-link">
            <button>EXPLORE MORE</button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PrizeBenefits;