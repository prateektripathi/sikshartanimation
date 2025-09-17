import React, { useEffect, useState } from "react";
import "./Calltoaction.css";
import { auth, BASE_URL } from "../data/allapi";

const Calltoaction = () => {
  const [ctaData, setCtaData] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const fetchCTA = async () => {
      try {
        const res = await fetch(`${BASE_URL}${auth.getcalltoactions}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCtaData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching CTA:", error);
      } finally {
        setLoading(false); // 👈 stop loading
      }
    };

    fetchCTA();
  }, []);

  const [firstWord, ...restTitle] = ctaData?.title?.split(" ") || [];

  return (
    <section className="calltoaction">
      <div className="cta-container">
        {/* Left Column */}
        <div className="cta-left">
          {loading ? (
            <>
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-subtitle" />
            </>
          ) : (
            <>
              <h2 className="cta-title">{firstWord}</h2>
              {restTitle.length > 0 && (
                <h3 className="cta-subtitle">{restTitle.join(" ")}</h3>
              )}
            </>
          )}
        </div>

        {/* Right Column */}
        <div className="cta-right">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="cta-item">
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-agency" />
                </div>
              ))
            : ctaData?.subtitles?.map((item) => (
                <div key={item._id} className="cta-item">
                  <span className="cta-text">
                    {item.text}
                    {item.text && <span className="cta-arrow">↗</span>}
                  </span>
                  <span className="cta-agency">
                    {item.subtext}
                    {item.subtext && <span className="cta-arrow">↗</span>}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Calltoaction;