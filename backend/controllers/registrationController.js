import HackathonRegistration from "../models/HackathonRegistration.js";

export const register = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.hackathon_id)
      return res.status(400).json({ message: "Hackathon ID is required" });

    const newReg = new HackathonRegistration(payload);
    await newReg.save();

    res.status(201).json({
      success: true,
      message: "Registration saved successfully!",
      data: newReg,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
