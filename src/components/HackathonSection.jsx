import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HackathonSection.css";
import { auth, BASE_URL } from "../data/allapi";

export default function HomeEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}${auth.getallhackathon}`);
        const data = await response.json();
        setEvents(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  const totalCards = 3;
  const displayCards = [...events];
  while (displayCards.length < totalCards) displayCards.push(null);

  return (
    <div className="events-container">
      <div className="events-header">
        <h1 className="events-title">Ongoing Events</h1>
        <button className="show-all-btn" onClick={() => navigate("/event")}>
          Show All Events →
        </button>
      </div>

      <div className="events-grid">
        {displayCards.map((event, index) => (
          <div key={index} className="event-card">
            <div className="card-inner">
              {event ? (
                <>
                  {/* Front Side */}
                  <div className="card-front">
                    <div className="event-tags">
                      <span className="event-type">{event.event_type}</span>
                      <span className="event-mode">{event.hackathon_type}</span>
                    </div>
                    <img
                      src={event.poster_image?.url?.trim() || "/images/default.jpg"}
                      alt={event.name}
                      onError={(e) => {
                        e.target.src = "/images/default.jpg";
                      }}
                    />
                    <h3>{event.name}</h3>
                  </div>

                  {/* Back Side */}
                  <div className="card-back">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <button
                      className="register-btn"
                      onClick={() => navigate(`/eventdetail/${event._id}`)}
                    >
                      Register Now
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Coming Soon Card */}
                  <div className="card-front">
                    <div className="event-tags">
                      <span className="event-type">Coming</span>
                      <span className="event-mode">Soon</span>
                    </div>
                    <img
                      src="/images/coming-soon.jpg"
                      alt="Coming Soon"
                      onError={(e) => {
                        e.target.src = "/images/default.jpg";
                      }}
                    />
                    <h3>Coming Soon</h3>
                  </div>

                  <div className="card-back">
                    <h3>Stay Tuned!</h3>
                    <p>Exciting events are on the way. Check back later.</p>
                    <button className="register-btn" disabled>
                      Coming Soon
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}