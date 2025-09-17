import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar, MapPin, Users, Trophy, Target, Network,
  BookOpen, Award, ArrowLeft
} from "lucide-react";
import { useEffect, useState } from "react";
import "./eventdetail.css";
import { auth, BASE_URL } from "../data/allapi";
import {NavLink} from "react-router-dom"
const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${BASE_URL}${auth.getsinglehackathon}${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".timeline-step");
      const newVisible = [];
      items.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          newVisible.push(i);
        }
      });
      setVisibleItems(newVisible);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!event) return <div>Loading...</div>;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const showLocation =
    event.location &&
    (event.hackathon_type === "offline" || event.hackathon_type === "hybrid");

  return (
    <div className="event-wrapper">
      <main className="event-content">
        {/* Back Button */}
        <button onClick={() => navigate("/event")} className="btn-back">
          <ArrowLeft className="icon" /> Back to Events
        </button>

        {/* Hero with full-width background */}
        <section
          className="hero-section dynamic-hero"
          style={{
            backgroundImage: `url(${event.poster_image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-layer">
            <div className="hero-text">
              <span className="tag">{event.event_type}</span>
              <h1>{event.name}</h1>
              <p>{event.description}</p>
              <NavLink to={`/eventdetail/${id}/eventregistration`}><button className="btn-primary">Register Now</button></NavLink>
            </div>
          </div>
        </section>

        {/* Event Info */}
        <section className="info-grid">
          <div className="info-box">
            <Calendar className="icon" />
            <div>
              <p className="title">Date</p>
              <p>
                {formatDate(event.hackathon_dates.start_date)} –{" "}
                {formatDate(event.hackathon_dates.end_date)}
              </p>
            </div>
          </div>

          <div className="info-box">
            <MapPin className="icon" />
            <div>
              <p className="title">Mode</p>
              <p>{event.hackathon_type}</p>
            </div>
          </div>

          <div className="info-box">
            <Users className="icon" />
            <div>
              <p className="title">Fee</p>
              <p>{event.is_paid ? `₹${event.amount_inr}` : "Free"}</p>
            </div>
          </div>

          {showLocation && (
            <div className="info-box">
              <MapPin className="icon" />
              <div>
                <p className="title">Location</p>
                <p>{event.location}</p>
              </div>
            </div>
          )}
        </section>

        {/* Benefits */}
        <section className="benefits-section">
          <h2>Benefits of Attending</h2>
          <div className="benefits-grid">
            {event.benefits.map((b, i) => {
              const Icon = [Target, Network, BookOpen, Award][i % 4];
              return (
                <div key={b._id} className="benefit-box">
                  <div className="benefit-icon">
                    <Icon className="icon" />
                  </div>
                  <div>
                    <h3>{b.text}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <h2>League Format & Timeline</h2>
          <div className="timeline-grid">
            {event.league_format.map((step, i) => (
              <div
                key={step._id}
                className={`timeline-step ${visibleItems.includes(i) ? "visible" : ""}`}
              >
                <div className="step-number">
                  {(i + 1).toString().padStart(2, "0")}
                </div>
                <div className="step-text">
                  <h3>{step.stage}</h3>
                  <p className="date">
                    {formatDate(step.start_datetime)} –{" "}
                    {formatDate(step.end_datetime)}
                  </p>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conducted By */}
       <section className="conducted-by-section">
  <h2>Conducted By</h2>
  <div className="conducted-by-grid">
    {event.conducted_by.map((college) => (
      <div key={college._id} className="college-card">
        <h3>{college.collegeName}</h3>
        <p><strong>Address:</strong> {college.address}, {college.city}, {college.state} - {college.pincode}</p>
        <p><strong>Email:</strong> <a href={`mailto:${college.email}`}>{college.email}</a></p>
        <p><strong>Phone:</strong> {college.phone}</p>
        <p><strong>Accreditation:</strong> {college.accreditation}</p>
        <p><strong>Established:</strong> {college.establishedYear}</p>
        <p><strong>Students:</strong> {college.studentCount}</p>
        <p><strong>Website:</strong> <a href={college.collegeWebsite} target="_blank" rel="noreferrer">{college.collegeWebsite}</a></p>
      </div>
    ))}
  </div>
</section>
<section className="jury-section">
  <h2>Jury Members</h2>
  <div className="jury-list">
    <div className="jury-card">
      <strong>CA - Mr. Akshat Agrawal</strong>
      <span>Chartered Accountant</span>
    </div>
    <div className="jury-card">
      <strong>Senior Mentor - Harish Diwedi Sir</strong>
      <span>Industry Mentor</span>
    </div>
    <div className="jury-card">
      <strong>Divyanshu Sir</strong>
      <span>Gov & Startup Public Policymaker</span>
    </div>
    <div className="jury-card">
      <strong>Shrubi Mam</strong>
      <span>Company Secretary</span>
    </div>
  </div>
</section>

        {/* Prizes */}
        <section className="prize-section">
          <h2>Prize Pool</h2>
          <div className="prize-grid">
            <div className="prize-icon">
              <Trophy className="icon-lg" />
            </div>
            <div className="prize-list">
              {event.prize_pool.map((p) => (
                <div key={p._id} className="prize-box">
                  <div>
                    <h3>{p.rank}</h3>
                    <p>{p.description}</p>
                  </div>
                  <div className="amount">
                    ₹{p.amount_inr.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventDetails;
