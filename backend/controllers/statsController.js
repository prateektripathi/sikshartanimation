import HackathonRegistration from "../models/HackathonRegistration.js";

export const getStats = async (req, res) => {
  try {
    const all = await HackathonRegistration.find();

    const total = all.length;
    const teams = all.filter(r => r.is_team_registration).length;
    const individuals = all.filter(r => !r.is_team_registration).length;
    const members = all.reduce(
      (acc, r) => acc + (r.team_members?.length || 0),
      0
    );

    res.json({
      total_registrations: total,
      total_teams: teams,
      total_individuals: individuals,
      total_team_members: members,
    });
  } catch (err) {
    res.status(500).json({ message: "Stats error" });
  }
};
