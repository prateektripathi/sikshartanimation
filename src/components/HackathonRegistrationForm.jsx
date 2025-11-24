import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";
import "./HackathonRegistrationForm.css";
import { auth, BASE_URL } from "../data/allapi";
import { AuthContext } from "../context/Authcontext";

const initialParticipant = {
  full_name: "",
  email: "",
  phone: "",
  date_of_birth: "", // date picker replaces age
  participated_before: "",
  background: "",
  idea_description: "",
  problem_theme: "",
  motivation: "",
  skills: "",
  heard_about: "",
  tshirt_size: "",
  team_members_text: "",
  file: null,
};

const participationOptions = ["Individual", "Team"];
const heardAboutOptions = ["Social Media", "Friend/Colleague", "Email", "Other"];
const tshirtSizes = ["XS", "S", "L", "XL", "XXL"];

export default function HackathonRegistrationForm() {
  const { usertoken } = useContext(AuthContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    hackathon_id: id,
    participation_type: "Individual",
    participant: { ...initialParticipant },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const inputs = document.querySelectorAll(
      ".hackathon-form input, .hackathon-form textarea, .hackathon-form select"
    );

    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.fromTo(
          input,
          { boxShadow: "0 0 0px #a166ff44", scale: 1 },
          { boxShadow: "0 0 12px #a166ff88", scale: 1.015, duration: 0.3, ease: "power3.out" }
        );
      });
      input.addEventListener("blur", () => {
        gsap.to(input, { boxShadow: "0 0 0px transparent", scale: 1, duration: 0.2 });
      });
    });

    return () => {
      document.querySelectorAll(".bubble").forEach((b) => b.remove());
      inputs.forEach((input) => {
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  const handleParticipationChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      participation_type: val,
    }));
  };

  const handleParticipantChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      participant: { ...prev.participant, [field]: value },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleParticipantChange("file", file);
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{6,15}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const p = formData.participant;

    if (!p.full_name) return toast.error("Full Name is required");
    if (!validateEmail(p.email)) return toast.error("Invalid Email");
    if (!validatePhone(p.phone)) return toast.error("Invalid Phone");
    if (!p.date_of_birth) return toast.error("Date of Birth is required");
    if (!p.idea_description) return toast.error("Idea description required");

    if (formData.participation_type === "Team" && !p.team_members_text) {
      return toast.error("Please fill Team Members (100 words)");
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      const response = await fetch(`${BASE_URL}${auth.hackathonregistration}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${usertoken}` },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Registration failed");
      }
      await response.json();
      toast.success("Registration successful!");
      setFormData({
        hackathon_id: id,
        participation_type: "Individual",
        participant: { ...initialParticipant },
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-form-container">
      <Toaster
        position="top-right"
        toastOptions={{ style: { background: "#222", color: "#6fd0ff", fontFamily: "Orbitron, sans-serif" } }}
      />
      <form className="hackathon-form" onSubmit={handleSubmit}>
        <h2>IDEATHON REGISTRATION</h2>

        <label>Full Name *</label>
        <input type="text" required value={formData.participant.full_name} onChange={(e) => handleParticipantChange("full_name", e.target.value)} />

        <label>Email Address *</label>
        <input type="email" required value={formData.participant.email} onChange={(e) => handleParticipantChange("email", e.target.value)} />

        <label>Phone Number *</label>
        <input type="tel" required value={formData.participant.phone} onChange={(e) => handleParticipantChange("phone", e.target.value)} />

        <label>Age (Select your date of birth) *</label>
        <input type="date" required value={formData.participant.date_of_birth} onChange={(e) => handleParticipantChange("date_of_birth", e.target.value)} />

        <label>Are you registering individually or as a team? *</label>
        <select value={formData.participation_type} onChange={handleParticipationChange} required>
          {participationOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {formData.participation_type === "Team" && (
          <>
            <label>Team Members (if applicable, 100 words)</label>
            <textarea
              value={formData.participant.team_members_text}
              onChange={(e) => handleParticipantChange("team_members_text", e.target.value)}
              maxLength={1000}
              placeholder="List your team members..."
            />
          </>
        )}

        <label>Have you participated in an Ideathon before? *</label>
        <select value={formData.participant.participated_before} onChange={(e) => handleParticipantChange("participated_before", e.target.value)} required>
          <option value="">Select</option>
          {["Yes", "No"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label>What is your background/area of expertise? *</label>
        <input type="text" value={formData.participant.background} onChange={(e) => handleParticipantChange("background", e.target.value)} required />

        <label>Describe your idea in 250 words *</label>
        <textarea value={formData.participant.idea_description} onChange={(e) => handleParticipantChange("idea_description", e.target.value)} required />

        <label>What problem or theme are you most interested in solving? *</label>
        <input type="text" value={formData.participant.problem_theme} onChange={(e) => handleParticipantChange("problem_theme", e.target.value)} required />

        <label>Why do you want to participate in this Ideathon? *</label>
        <textarea value={formData.participant.motivation} onChange={(e) => handleParticipantChange("motivation", e.target.value)} required />

        <label>What skills or experience do you bring to your team? *</label>
        <input type="text" value={formData.participant.skills} onChange={(e) => handleParticipantChange("skills", e.target.value)} required />

        <label>How did you hear about this Ideathon? *</label>
        <select value={formData.participant.heard_about} onChange={(e) => handleParticipantChange("heard_about", e.target.value)} required>
          <option value="">Select</option>
          {heardAboutOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label>T-shirt Size (for swag, if applicable) *</label>
        <select value={formData.participant.tshirt_size} onChange={(e) => handleParticipantChange("tshirt_size", e.target.value)} required>
          <option value="">Select</option>
          {tshirtSizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <label>Upload your idea in the documents (PDF, doc, presentation, or spreadsheet, Max 10MB)</label>
        <input type="file" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Register"}</button>
      </form>
    </div>
  );
}