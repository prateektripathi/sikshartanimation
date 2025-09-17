import React from "react";
import "./LearnMore.css";

const LearnMore = () => {
  return (
    <div className="learn-container">
      {/* Header */}
      <header className="learn-header">
        <span className="tag">Hackathon</span>
        <h1>Global AI Hackathon 2025</h1>
        <p>Join us for an exciting hackathon experience where innovation meets collaboration.</p>
        <button className="primary-btn">Register Now</button>
      </header>

      {/* Info Boxes */}
      <section className="info-section">
        <div className="info-box">
          <h3>Date</h3>
          <p>December 15–17, 2024</p>
        </div>
        <div className="info-box">
          <h3>Location</h3>
          <p>Tech Hub, Innovation Center</p>
        </div>
        <div className="info-box">
          <h3>Participants</h3>
          <p>150 Registered</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <h2>Benefits of Attending</h2>
        <div className="benefit-grid">
          <div className="benefit-card">
            <h4>Hands-on workshops with experts</h4>
            <p>Learn directly from industry professionals and gain practical experience with cutting-edge technologies.</p>
          </div>
          <div className="benefit-card">
            <h4>Network with peers and industry leaders</h4>
            <p>Expand your professional network and collaborate with like-minded innovators.</p>
          </div>
          <div className="benefit-card">
            <h4>Guidance from seasoned mentors</h4>
            <p>Get mentorship and insights from experienced professionals.</p>
          </div>
          <div className="benefit-card">
            <h4>Build a standout portfolio</h4>
            <p>Create projects that showcase your skills and make you stand out in the job market.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline">
        <h2>League Format & Timeline</h2>
        <ul>
          <li><span>01</span> Submission Period – Aug 21 – Sept 14, 2025</li>
          <li><span>02</span> General Round – Sept 15 – Sept 22, 2025</li>
          <li><span>03</span> Prototype Submission – Sept 23 – Oct 7, 2025</li>
          <li><span>04</span> Quarterfinals – Oct 8 – Oct 16, 2025</li>
        </ul>
      </section>

      {/* Prize Pool */}
      <section className="prizes">
        <h2>Prize Pool</h2>
        <div className="prize-list">
          <div className="prize-card">
            <h3>1st Prize</h3>
            <p>Complete winner’s package</p>
            <span>₹2,00,000</span>
          </div>
          <div className="prize-card">
            <h3>2nd Prize</h3>
            <p>Runner-up benefits package</p>
            <span>₹1,25,000</span>
          </div>
          <div className="prize-card">
            <h3>3rd Prize</h3>
            <p>Third place reward package</p>
            <span>₹75,000</span>
          </div>
          <div className="prize-card">
            <h3>Runner-Up</h3>
            <p>Recognition for Top 10 Teams</p>
            <span>₹10,000</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMore;
