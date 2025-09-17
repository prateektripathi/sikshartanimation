import React, { useState } from "react";
import { auth, BASE_URL } from "../data/allapi";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    type: "General Query",
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    sponsorshipType: "",
    reason: "",
    message: "",
    partnershipType: "",
    fullName: "",
    jobTitle: "",
    company: "",
    companyType: "",
    country: "",
    careAbout: "",
    subject: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 👇 API call same rahega
    let payload = { type: formData.type };

    if (formData.type === "Partner") {
      payload = {
        type: "Partner",
        fullName: formData.fullName,
        email: formData.email,
        jobTitle: formData.jobTitle,
        company: formData.company,
        companyType: formData.companyType,
        country: formData.country,
        careAbout: formData.careAbout,
        message: formData.message,
      };
    } else if (formData.type === "Sponsor") {
      payload = {
        type: "Sponsor",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        role: formData.role,
        sponsorshipType: formData.sponsorshipType,
        reason: formData.reason,
      };
    } else if (formData.type === "General Query") {
      payload = {
        type: "General Query",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };
    }

    try {
      const response = await fetch(`${BASE_URL}${auth.createhakathoncontact}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      toast.success(`Your ${formData.type} query has been submitted successfully!`);

      // reset
      setFormData({
        type: formData.type,
        name: "",
        email: "",
        phone: "",
        organization: "",
        role: "",
        sponsorshipType: "",
        reason: "",
        message: "",
        partnershipType: "",
        fullName: "",
        jobTitle: "",
        company: "",
        companyType: "",
        country: "",
        careAbout: "",
        subject: "",
      });
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>
      {/* Toaster for alerts */}
      <Toaster position="top-right" />

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-[#0b0f1d] to-[#120024] text-white p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-5xl bg-[#0b0f1d]/90 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-[#39a0ff]/40">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#39a0ff] mb-6 sm:mb-8">
            Contact Us
          </h1>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {["Partner", "Sponsor", "General Query"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`px-4 sm:px-6 py-2 rounded-full border transition-all duration-300 text-sm sm:text-base ${
                  formData.type === type
                    ? "bg-[#39a0ff] text-black border-[#39a0ff]"
                    : "bg-transparent text-white border-[#39a0ff]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Responsive Grid for Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {formData.type === "Partner" && (
                <>
                  <Input label="Full Name*" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  <Input label="Email*" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <Input label="Job Title*" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
                  <Input label="Company Name*" name="company" value={formData.company} onChange={handleChange} required />
                  <Select label="Company Type*" name="companyType" value={formData.companyType} onChange={handleChange} required options={["Startup","Corporate","Educational Institution","Non-Profit","Other"]}/>
                  <Select label="Country*" name="country" value={formData.country} onChange={handleChange} required options={["India","USA","UK","Germany","Other"]}/>
                  <Select label="I care most about*" name="careAbout" value={formData.careAbout} onChange={handleChange} required options={["Technical Collaboration","Knowledge Sharing","Community Engagement","Outreach / Marketing","Other"]}/>
                </>
              )}

              {formData.type === "Sponsor" && (
                <>
                  <Input label="Name (Sponsor Contact Person)*" name="name" value={formData.name} onChange={handleChange} required />
                  <Input label="Organization / Company Name*" name="organization" value={formData.organization} onChange={handleChange} required />
                  <Input label="Designation / Role*" name="role" value={formData.role} onChange={handleChange} required />
                  <Input label="Email Address*" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <Input label="Phone Number / WhatsApp*" name="phone" value={formData.phone} onChange={handleChange} required />
                  <Select label="Interested Sponsorship Type*" name="sponsorshipType" value={formData.sponsorshipType} onChange={handleChange} required options={["Title Sponsor","Gold","Silver","Bronze","In-kind","Other"]}/>
                </>
              )}

              {formData.type === "General Query" && (
                <>
                  <Input label="Full Name*" name="name" value={formData.name} onChange={handleChange} required />
                  <Input label="Email*" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                  <Input label="Subject*" name="subject" value={formData.subject} onChange={handleChange} required />
                </>
              )}
            </div>

            {/* Textareas (always full width) */}
            {formData.type === "Partner" && (
              <Textarea label="How can we help?" name="message" value={formData.message} onChange={handleChange} />
            )}
            {formData.type === "Sponsor" && (
              <Textarea label="Why Interested in Sponsoring Shikshart Hackathon?*" name="reason" value={formData.reason} onChange={handleChange} required />
            )}
            {formData.type === "General Query" && (
              <Textarea label="Message / Query*" name="message" value={formData.message} onChange={handleChange} required />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#39a0ff] hover:bg-[#1d7cd6] transition-all duration-300 font-semibold text-lg"
            >
              Submit Query
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// Reusable Components
const Input = ({ label, name, value, onChange, type = "text", required }) => (
  <div>
    <label className="block mb-2 text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 rounded-lg bg-[#1a1f2e] text-white border border-[#39a0ff]/30 focus:outline-none focus:ring-2 focus:ring-[#39a0ff]"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, required }) => (
  <div>
    <label className="block mb-2 text-gray-300">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 rounded-lg bg-[#1a1f2e] text-white border border-[#39a0ff]/30 focus:outline-none focus:ring-2 focus:ring-[#39a0ff]"
    >
      <option value="">Select option</option>
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, name, value, onChange, required }) => (
  <div>
    <label className="block mb-2 text-gray-300">{label}</label>
    <textarea
      name={name}
      rows="4"
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 rounded-lg bg-[#1a1f2e] text-white border border-[#39a0ff]/30 focus:outline-none focus:ring-2 focus:ring-[#39a0ff]"
    />
  </div>
);

export default ContactForm;
