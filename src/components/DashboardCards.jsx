import React from "react";

const DashboardCards = ({ stats }) => {
  return (
    <div className="dashboard-cards">
      {stats.map((item, idx) => (
        <div key={idx} className="card">
          <h3>{item.title}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
