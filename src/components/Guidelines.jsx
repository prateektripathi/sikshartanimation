import React from "react";

const HackathonGuidelines = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-[#0b0f1d] to-[#120024] text-white p-6">
      {/* Increased width from max-w-4xl to max-w-6xl */}
      <div className="max-w-6xl w-full bg-[#0b0f1d]/90 rounded-2xl shadow-2xl p-10 border border-[#39a0ff]/40">
        <h1 className="text-4xl font-bold text-center text-[#39a0ff] mb-10">
          Shikshart Hackathon – Guidelines
        </h1>

        <Section title="1. Eligibility" items={[
          "Open to students, innovators, and early-stage creators.",
          "Solo or Team (max 4 members).",
          "All disciplines welcome (tech, design, business, content)."
        ]} />

        <Section title="2. Themes & Problem Statements" items={[
          "AI in Education",
          "Smart Solutions for Everyday India",
          "Green & Sustainable Tech",
          "Open Innovation (bring your own idea)"
        ]} />

        <Section title="3. Registration" items={[
          "Individual: ₹199",
          "Team: ₹499",
          "Online registration only (no on-spot).",
          "Limited seats – first come, first served."
        ]} />

        <Section title="4. Format & Timeline" items={[
          "Round 1: Idea Submission (online)",
          "Round 2: 24–36 hrs Offline Hackathon",
          "Round 3: Demo + Jury Pitch"
        ]} />

        <Section title="5. Rules" items={[
          "Original work only – plagiarism = disqualification.",
          "Use of open-source tools encouraged.",
          "Respect time limits & submission deadlines.",
          "Teamwork > Solo coding marathons."
        ]} />

        <Section title="6. Judging Criteria" items={[
          "Innovation – How unique is the solution?",
          "Impact – Real-world applicability.",
          "Execution – Tech feasibility, prototype quality.",
          "Pitch – Clarity, storytelling, confidence."
        ]} />

        <Section title="7. Prizes & Opportunities" items={[
          "Cash prizes, swags, and certificates.",
          "Internship & mentorship opportunities.",
          "Direct entry to Shikshart Startup Programs.",
          "Networking with industry mentors."
        ]} />

        <Section title="8. Code of Conduct" items={[
          "Be respectful, collaborative, and professional.",
          "Zero tolerance for harassment or discrimination.",
          "Shikshart reserves rights to moderate."
        ]} />

        <Section title="9. Support" items={[
          "On-ground mentors & volunteers.",
          "Food, internet, and basic resources provided.",
          "For queries: support@shikshart.com"
        ]} />

        <p className="text-center text-sm text-gray-400 mt-10">
          © Shikshart Hackathon
        </p>
      </div>
    </div>
  );
};

const Section = ({ title, items }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[#39a0ff] mb-3">{title}</h2>
    <ul className="list-disc pl-6 space-y-2 text-gray-200">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

export default HackathonGuidelines;
