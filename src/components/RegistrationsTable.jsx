import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";

const RegistrationsTable = () => {
  const { token } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/hackathon/registrations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setRegistrations(data));
  }, []);

  return (
    <div className="table-container">
      <h3>All Registrations</h3>

      {registrations.length === 0 ? (
        <p>No registrations yet</p>
      ) : (
        <table className="registrations-table">
          <thead>
            <tr>
              <th>Name / Team</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Total Members</th>
              <th>Registered On</th>
            </tr>
          </thead>

          <tbody>
            {registrations.map((r, i) => (
              <tr key={i}>
                <td>
                  {r.is_team_registration
                    ? r.team_name
                    : `${r.individual.first_name} ${r.individual.last_name}`}
                </td>

                <td>
                  {r.is_team_registration
                    ? r.team_leader.email
                    : r.individual.email}
                </td>

                <td>
                  {r.is_team_registration
                    ? r.team_leader.phone
                    : r.individual.phone}
                </td>

                <td>{r.participation_type}</td>

                <td>{r.team_members?.length || 0}</td>

                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegistrationsTable;
