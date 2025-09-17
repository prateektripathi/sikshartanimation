import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";
import "./HackathonRegistrationForm.css";
import { auth, BASE_URL } from "../data/allapi";
import { AuthContext } from "../context/Authcontext";

const initialParticipant = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  organization: "",
  current_designation: "",
  years_of_experience: "",
  registered_by: {
    user_type: "student",
    user_id: ""
  }
};

const participationTypes = ["individual", "2", "3", "4", "5"];

export default function HackathonRegistrationForm() {
  const { usertoken } = useContext(AuthContext);
  const { id } = useParams(); // 👈 Get hackathon_id from URL
  const [formData, setFormData] = useState({
    hackathon_id: "",
    participation_type: "individual",
    is_team_registration: false,
    individual: { ...initialParticipant },
    team_name: "",
    team_leader: { ...initialParticipant },
    team_members: [],
    why_do_you_want_to_participate: "",
    agree_to_terms: false,
    is_payment_required: false,
    payment_status: "pending",
    payment_reference: "",
    paid_amount: "",
    payment_mode: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, hackathon_id: id }));

    const inputs = document.querySelectorAll(
      ".hackathon-form input, .hackathon-form textarea, .hackathon-form select"
    );

    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.fromTo(
          input,
          { boxShadow: "0 0 0px #a166ff44", scale: 1 },
          {
            boxShadow: "0 0 12px #a166ff88",
            scale: 1.015,
            duration: 0.3,
            ease: "power3.out",
          }
        );
      });

      input.addEventListener("blur", () => {
        gsap.to(input, {
          boxShadow: "0 0 0px transparent",
          scale: 1,
          duration: 0.2,
        });
      });
    });

    const container = document.querySelector(".registration-form-container");
    for (let i = 0; i < 10; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.top = `${Math.random() * 100}%`;
      bubble.style.left = `${Math.random() * 100}%`;
      container.appendChild(bubble);

      gsap.to(bubble, {
        y: -100 - Math.random() * 200,
        x: -50 + Math.random() * 100,
        repeat: -1,
        yoyo: true,
        duration: 8 + Math.random() * 6,
        ease: "sine.inOut",
        delay: Math.random() * 5,
      });
    }

    return () => {
      document.querySelectorAll(".bubble").forEach((b) => b.remove());
    };
  }, [id]);

  const handleParticipationChange = (e) => {
    const val = e.target.value;
    const isTeam = val !== "individual";
    const teamSize = isTeam ? parseInt(val, 10) : 0;

    setFormData((prev) => ({
      ...prev,
      participation_type: val,
      is_team_registration: isTeam,
      team_members: Array(isTeam ? teamSize - 1 : 0)
        .fill(null)
        .map(() => ({ ...initialParticipant })),
      individual: { ...initialParticipant },
      team_name: "",
      team_leader: { ...initialParticipant },
    }));
  };

  const handleParticipantChange = (field, value, participantKey) => {
    setFormData((prev) => ({
      ...prev,
      [participantKey]: {
        ...prev[participantKey],
        [field]: value,
      },
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const members = [...prev.team_members];
      members[index] = {
        ...members[index],
        [field]: value,
      };
      return { ...prev, team_members: members };
    });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{6,15}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hackathon_id) {
      toast.error("Hackathon ID is required");
      return;
    }

    if (!formData.why_do_you_want_to_participate) {
      toast.error("Please tell us why you want to participate");
      return;
    }

    if (!formData.agree_to_terms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    if (formData.is_team_registration) {
      if (!formData.team_name) {
        toast.error("Team name is required for team registration");
        return;
      }
      const leader = formData.team_leader;
      for (let field of ["first_name", "last_name", "email", "phone"]) {
        if (!leader[field]) {
          toast.error(`Team leader ${field.replace("_", " ")} is required`);
          return;
        }
      }
      if (!validateEmail(leader.email)) {
        toast.error("Team leader email is invalid");
        return;
      }
      if (!validatePhone(leader.phone)) {
        toast.error("Team leader phone is invalid");
        return;
      }

      const expectedMembers = parseInt(formData.participation_type, 10) - 1;
      if (formData.team_members.length !== expectedMembers) {
        toast.error(`Expected ${expectedMembers} team members`);
        return;
      }

      for (let i = 0; i < formData.team_members.length; i++) {
        const member = formData.team_members[i];
        for (let field of ["first_name", "last_name", "email", "phone"]) {
          if (!member[field]) {
            toast.error(`Member ${i + 1} ${field.replace("_", " ")} is required`);
            return;
          }
        }
        if (!validateEmail(member.email)) {
          toast.error(`Member ${i + 1} email is invalid`);
          return;
        }
        if (!validatePhone(member.phone)) {
          toast.error(`Member ${i + 1} phone is invalid`);
          return;
        }
      }
    } else {
      const ind = formData.individual;
      for (let field of ["first_name", "last_name", "email", "phone"]) {
        if (!ind[field]) {
          toast.error(`Individual ${field.replace("_", " ")} is required`);
          return;
        }
      }
      if (!validateEmail(ind.email)) {
        toast.error("Individual email is invalid");
        return;
      }
      if (!validatePhone(ind.phone)) {
        toast.error("Individual phone is invalid");
        return;
      }
    }

    setLoading(true);
    try {
      const payload = {
        hackathon_id: formData.hackathon_id,
        participation_type: formData.participation_type,
        is_team_registration: formData.is_team_registration,
        individual: formData.individual,
        team_name: formData.team_name,
        team_leader: formData.team_leader,
        team_members: formData.team_members,
        why_do_you_want_to_participate: formData.why_do_you_want_to_participate,
        agree_to_terms: formData.agree_to_terms,
      };

      const response = await fetch(`${BASE_URL}${auth.hackathonregistration}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usertoken}`, // ✅ Correct template string
        },
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
        participation_type: "individual",
        is_team_registration: false,
        individual: { ...initialParticipant },
        team_name: "",
        team_leader: { ...initialParticipant },
        team_members: [],
        why_do_you_want_to_participate: "",
        agree_to_terms: false,
        is_payment_required: false,
        payment_status: "pending",
        payment_reference: "",
        paid_amount: "",
        payment_mode: "",
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
        toastOptions={{
          style: {
            background: "#222",
            color: "#6fd0ff",
            fontFamily: "Orbitron, sans-serif",
          },
        }}
      />
      <form className="hackathon-form" onSubmit={handleSubmit}>
        <h2>HACKATHON REGISTRATION</h2>

        <label htmlFor="hackathon_id">Hackathon ID</label>
        <input type="text" id="hackathon_id" value={formData.hackathon_id} disabled />

        <label htmlFor="participation_type">Participation Type</label>
        <select
          id="participation_type"
          value={formData.participation_type}
          onChange={handleParticipationChange}
          required
        >
          {participationTypes.map((type) => (
            <option key={type} value={type}>
              {type === "individual" ? "Individual" : `${type} Members Team`}
            </option>
          ))}
        </select>

        {!formData.is_team_registration && (
          <div className="team-section">
            <h3>Individual Participant Details</h3>
            {renderParticipantFields(
              "individual",
              formData.individual,
              handleParticipantChange
            )}
          </div>
        )}

        {formData.is_team_registration && (
          <>
            <label htmlFor="team_name">Team Name</label>
            <input
              type="text"
              id="team_name"
              required
              value={formData.team_name}
              onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
              placeholder="Enter your team name"
            />

            <div className="team-section">
              <h3>Team Leader Details</h3>
              {renderParticipantFields(
                "team_leader",
                formData.team_leader,
                handleParticipantChange
              )}
            </div>

            <div className="team-section">
              <h3>Team Members</h3>
              {formData.team_members.map((member, idx) => (
                <div key={idx} className="team-member">
                  <h4>Member {idx + 2}</h4>
                  {renderTeamMemberFields(idx, member, handleTeamMemberChange)}
                </div>
              ))}
            </div>
          </>
        )}

        <label htmlFor="why_do_you_want_to_participate">
          Why do you want to participate?
        </label>
        <textarea
          id="why_do_you_want_to_participate"
          required
          value={formData.why_do_you_want_to_participate}
          onChange={(e) =>
            setFormData({ ...formData, why_do_you_want_to_participate: e.target.value })
          }
          placeholder="Tell us your motivation..."
        />

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="agree_to_terms"
            checked={formData.agree_to_terms}
            onChange={(e) =>
              setFormData({ ...formData, agree_to_terms: e.target.checked })
            }
            required
          />
          <label htmlFor="agree_to_terms">I agree to the terms and conditions</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
}

function renderParticipantFields(prefix, participant, onChange) {
  return (
    <>
      <div className="small-inputs">
        <div className="input-group">
          <label htmlFor={`${prefix}_first_name`}>First Name</label>
          <input
            id={`${prefix}_first_name`}
            type="text"
            required
            value={participant.first_name}
            onChange={(e) => onChange("first_name", e.target.value, prefix)}
            placeholder="First Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor={`${prefix}_last_name`}>Last Name</label>
          <input
            id={`${prefix}_last_name`}
            type="text"
            required
            value={participant.last_name}
            onChange={(e) => onChange("last_name", e.target.value, prefix)}
            placeholder="Last Name"
          />
        </div>
      </div>

      <label htmlFor={`${prefix}_email`}>Email</label>
      <input
        id={`${prefix}_email`}
        type="email"
        required
        value={participant.email}
        onChange={(e) => onChange("email", e.target.value, prefix)}
        placeholder="example@mail.com"
      />

      <label htmlFor={`${prefix}_phone`}>Phone</label>
      <input
        id={`${prefix}_phone`}
        type="tel"
        required
        value={participant.phone}
        onChange={(e) => onChange("phone", e.target.value, prefix)}
        placeholder="+1234567890"
      />

      <label htmlFor={`${prefix}_organization`}>Organization/College</label>
      <input
        id={`${prefix}_organization`}
        type="text"
        value={participant.organization}
        onChange={(e) => onChange("organization", e.target.value, prefix)}
        placeholder="Your organization"
      />

      <label htmlFor={`${prefix}_current_designation`}>Current Designation</label>
      <input
        id={`${prefix}_current_designation`}
        type="text"
        value={participant.current_designation}
        onChange={(e) => onChange("current_designation", e.target.value, prefix)}
        placeholder="Your role"
      />

      <label htmlFor={`${prefix}_years_of_experience`}>Years of Experience</label>
      <input
        id={`${prefix}_years_of_experience`}
        type="number"
        min="0"
        required
        value={participant.years_of_experience}
        onChange={(e) => onChange("years_of_experience", e.target.value, prefix)}
        placeholder="0"
      />
    </>
  );
}

function renderTeamMemberFields(index, member, onChange) {
  return (
    <>
      <div className="small-inputs">
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            required
            value={member?.first_name || ""}
            onChange={(e) => onChange(index, "first_name", e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            required
            value={member?.last_name || ""}
            onChange={(e) => onChange(index, "last_name", e.target.value)}
            placeholder="Last Name"
          />
        </div>
      </div>

      <label>Email</label>
      <input
        type="email"
        required
        value={member?.email || ""}
        onChange={(e) => onChange(index, "email", e.target.value)}
        placeholder="example@mail.com"
      />

      <label>Phone</label>
      <input
        type="tel"
        required
        value={member?.phone || ""}
        onChange={(e) => onChange(index, "phone", e.target.value)}
        placeholder="+1234567890"
      />

      <label>Organization/College</label>
      <input
        type="text"
        value={member?.organization || ""}
        onChange={(e) => onChange(index, "organization", e.target.value)}
        placeholder="Your organization"
      />

      <label>Current Designation</label>
      <input
        type="text"
        value={member?.current_designation || ""}
        onChange={(e) => onChange(index, "current_designation", e.target.value)}
        placeholder="Your role"
      />

      <label>Years of Experience</label>
      <input
        type="number"
        min="0"
        required
        value={member?.years_of_experience || ""}
        onChange={(e) => onChange(index, "years_of_experience", e.target.value)}
        placeholder="0"
      />
    </>
  );
}
