import React, { useState } from "react";
import "./Register.css";
import { auth, BASE_URL } from "../data/allapi";
import { toast, Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const FloatingBubble = ({ delay, size, top, left }) => (
  <div
    className="absolute rounded-full bg-white opacity-10 blur-sm bubble"
    style={{
      animationDelay: `${delay}s`,
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
    }}
  />
);

const Register = () => {
  const navigate=useNavigate()
  const [role, setRole] = useState("student");
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    collegeName: "",
    courseName: "",
    yearOfStudy: "",
    password: "",
    confirmPassword: "",
    skills: "",
    yearsOfExperience: "",
  });

  // Floating bubbles
  const bubbles = Array.from({ length: 20 }).map(() => ({
    delay: Math.random() * 12,
    size: 6 + Math.random() * 14,
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", { style: { background: "#333", color: "#fff" } });
      return;
    }

    let payload = {
      role,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    if (role === "student") {
      payload = {
        ...payload,
        age: Number(formData.age),
        collegeName: formData.collegeName,
        courseName: formData.courseName,
        yearOfStudy: Number(formData.yearOfStudy),
      };
    } else if (role === "freelancer") {
      payload = {
        ...payload,
        yearsOfExperience: Number(formData.yearsOfExperience),
        skills: formData.skills.split(",").map((s) => ({ name: s.trim() })),
      };
    }

    try {
      const res = await fetch(`${BASE_URL}${auth.register}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  // agar cookies ya auth token chahiye ho
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed", { style: { background: "#333", color: "#fff" } });
        return;
      }

      toast.success("Signup successful. Check your email/phone for OTP.", { style: { background: "#333", color: "#fff" } });
      setStep("otp");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.", { style: { background: "#333", color: "#fff" } });
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    // makeup otp string
    const otpString = otp.join("");
    if (otpString.length < 4) {
      toast.error("Please enter full OTP", { style: { background: "#333", color: "#fff" } });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}${auth.verifyOtp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          otp: otpString,
          role: role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "OTP verification failed", { style: { background: "#333", color: "#fff" } });
        return;
      }

      toast.success("OTP verified successfully", { style: { background: "#333", color: "#fff" } });
      navigate("/")
      
      // aap yahan redirect/shown next step kar sakte ho
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP", { style: { background: "#333", color: "#fff" } });
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await fetch(`${BASE_URL}${auth.resendotp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          role: role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not resend OTP", { style: { background: "#333", color: "#fff" } });
        return;
      }

      toast.success("OTP resent successfully", { style: { background: "#333", color: "#fff" } });
    } catch (err) {
      console.error(err);
      toast.error("Error resending OTP", { style: { background: "#333", color: "#fff" } });
    }
  };

  return (
    <div className="register-wrapper relative overflow-hidden bg-black text-white py-24 px-6 md:px-24 z-10">
      <Toaster position="top-right" toastOptions={{
        style: { background: "#333", color: "#fff" },
      }} />
      {/* Animations */}
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-800px) scale(1.2); opacity: 0; }
        }
        .animate-pulse-slow { animation: pulseSlow 6s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 10s ease-in-out infinite; }
        .bubble { animation: bubble 12s linear infinite; }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-700 rounded-full opacity-30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-80px] w-[250px] h-[250px] bg-pink-700 rounded-full opacity-30 blur-[100px] animate-float" />
        <div className="absolute bottom-[-120px] left-[30%] w-[350px] h-[350px] bg-blue-700 rounded-full opacity-20 blur-[160px] animate-float-slow" />
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {bubbles.map((bubble, index) => (
          <FloatingBubble key={index} {...bubble} />
        ))}
      </div>

      {/* Content */}
      <div className="register-container relative z-10">
        <h2 className="title">Register</h2>

        {step === "form" && (
          <>
            <div className="role-switch">
              <button className={role === "student" ? "active" : ""} onClick={() => setRole("student")}>
                Student
              </button>
              <button className={role === "freelancer" ? "active" : ""} onClick={() => setRole("freelancer")}>
                Freelancer
              </button>
            </div>

            {role === "student" && (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="full-width" />
                </div>
                <div className="form-row">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="full-width" />
                </div>
                <div className="form-row">
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                </div>
                <div className="form-row">
                  <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="College Name" required className="large-input" />
                </div>
                <div className="form-row">
                  <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required className="small-input" />
                  <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="Course / Domain" required className="small-input" />
                  <input type="number" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} placeholder="Year of Study" required className="small-input" />
                </div>
                <div className="form-row">
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                </div>
                <button type="submit" className="btn">Register as Student</button>
              </form>
            )}

            {role === "freelancer" && (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="full-width" />
                </div>
                <div className="form-row">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="full-width" />
                </div>
                <div className="form-row">
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                </div>
                <div className="form-row">
                  <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" required />
                  <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} placeholder="Experience (in years)" required />
                </div>
                <div className="form-row">
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
                </div>
                <button type="submit" className="btn">Register as Freelancer</button>
              </form>
            )}

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <p style={{ color: "#aaa" }}>
                Already have an account? <NavLink to="/login" className="link text-blue-500">Login here</NavLink>
              </p>
            </div>
          </>
        )}

        {step === "otp" && (
          <div className="otp-container">
            <h3 className="title">OTP Verification</h3>
            <p style={{ textAlign: "center", marginBottom: "15px" }}>
              Enter the 4‑digit OTP sent to your email/phone
            </p>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  className={!digit ? "bounce" : ""}
                  style={{ animationDelay: `${index * 0.3}s` }}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      document.getElementById(`otp-${index - 1}`)?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button className="btn" style={{ marginTop: "20px" }} onClick={handleVerifyOtp}>
              Verify OTP
            </button>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <p className="resend-otp" onClick={handleResendOtp} style={{ cursor: "pointer", color: "#aaa", textDecoration: "underline" }}>
                Resend OTP
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;