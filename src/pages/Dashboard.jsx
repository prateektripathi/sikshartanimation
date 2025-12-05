import React, { useEffect, useState, useContext } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCards from "../components/DashboardCards";
import RegistrationsTable from "../components/RegistrationsTable";
import { AuthContext } from "../context/Authcontext";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState([
    { title: "Total Registrations", value: 0 },
    { title: "Teams", value: 0 },
    { title: "Individual Participants", value: 0 },
    { title: "Total Team Members", value: 0 },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hackathon/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data =>
        setStats([
          { title: "Total Registrations", value: data.total_registrations },
          { title: "Teams", value: data.total_teams },
          { title: "Individual Participants", value: data.total_individuals },
          { title: "Total Team Members", value: data.total_team_members },
        ])
      );
  }, []);

  return (
    <DashboardLayout>
      <DashboardCards stats={stats} />
      <RegistrationsTable />
    </DashboardLayout>
  );
};

export default Dashboard;
