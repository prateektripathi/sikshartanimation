import React, { useContext, useState } from "react";
import "./Register.css";
import { auth, BASE_URL } from "../data/allapi";
import { toast, Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

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

const Login = () => {
  const navigate = useNavigate();
  const { settoken } = useContext(AuthContext); 
  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotRole, setForgotRole] = useState("student");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [viewState, setViewState] = useState("login");

  const bubbles = Array.from({ length: 15 }).map(() => ({
    delay: Math.random() * 12,
    size: 6 + Math.random() * 14,
    top: Math.random() * 100,
    left: Math.random() * 100,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}${auth.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.emailOrPhone,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      if (data.accessToken) {
        settoken(data.accessToken);
      }

      toast.success("Login successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login");
    }
  };

  const handleForgotSubmit = async () => {
    if (!forgotEmail) {
      toast.error("Please enter email");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}${auth.forgotpassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: forgotEmail, role: forgotRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not send OTP");
        return;
      }
      toast.success("OTP sent to your email");
      setViewState("otp");
    } catch (err) {
      console.error(err);
      toast.error("Error sending forgot password request");
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-reset-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerifyResetOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length < 4) {
      toast.error("Please enter full OTP");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}${auth.forgotpasswordotpverify}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: forgotEmail,
          otp: otpString,
          role: forgotRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "OTP verification failed");
        return;
      }
      toast.success("OTP verified");
      setViewState("reset");
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}${auth.resetpassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: forgotEmail,
          password: newPassword,
          confirmPassword: confirmNewPassword,
          role: forgotRole,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Reset password failed");
        return;
      }
      toast.success("Password reset successful");
      setViewState("login");
    } catch (err) {
      console.error(err);
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="register-wrapper relative overflow-hidden bg-black text-white py-24 px-6 md:px-24 z-10">
      <Toaster position="top-right" />
      {/* animations ke liye inline css */}
      <style>{`
        @keyframes pulseSlow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
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

      {/* background bubbles */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-purple-700 rounded-full opacity-30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[25%] right-[-80px] w-[200px] h-[200px] bg-pink-700 rounded-full opacity-30 blur-[100px] animate-float" />
        <div className="absolute bottom-[-120px] left-[30%] w-[300px] h-[300px] bg-blue-700 rounded-full opacity-20 blur-[160px] animate-float-slow" />
      </div>

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {bubbles.map((bubble, index) => (
          <FloatingBubble key={index} {...bubble} />
        ))}
      </div>

      {/* content */}
      <div className="register-container relative z-10">
        <h2 className="title text-center mb-6">
          {{
            login: "Login",
            forgot: "Forgot Password",
            otp: "Enter OTP",
            reset: "Reset Password",
          }[viewState]}
        </h2>

        {/* login form */}
        {viewState === "login" && (
          <form className="form" onSubmit={handleLogin}>
            <div className="form-row">
              <input
                type="text"
                name="emailOrPhone"
                placeholder="Email or Phone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
                className="full-width"
              />
            </div>
            <div className="form-row">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="full-width"
              />
            </div>
            <div
              className="text-sm text-blue-500 mt-2 cursor-pointer hover:underline"
              onClick={() => setViewState("forgot")}
            >
              Forgot Password?
            </div>
            <button type="submit" className="btn mt-6">
              Login
            </button>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                If you do not have an account,{" "}
                <NavLink to="/register" className="text-blue-500 hover:underline">
                  signup here
                </NavLink>
              </p>
            </div>
          </form>
        )}

        {/* forgot password */}
        {viewState === "forgot" && (
          <div>
            <div className="role-switch flex gap-4 justify-center mb-4">
              <button
                type="button"
                onClick={() => setForgotRole("student")}
                className={`btn btn-small ${forgotRole === "student" ? "!bg-blue-600 !text-white" : "!bg-gray-200 !text-black"}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setForgotRole("freelancer")}
                className={`btn btn-small ${forgotRole === "freelancer" ? "!bg-blue-600 !text-white" : "!bg-gray-200 !text-black"}`}
              >
                Freelancer
              </button>
            </div>

            <div className="form-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="full-width"
              />
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                className="btn btn-small"
                type="button"
                onClick={() => setViewState("login")}
              >
                Cancel
              </button>
              <button
                className="btn btn-small"
                type="button"
                onClick={handleForgotSubmit}
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {/* otp verify */}
        {viewState === "otp" && (
          <div className="text-center">
            <div className="flex justify-center gap-3 mt-4 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-reset-${index}`}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  className="w-10 h-10 text-center text-xl border border-gray-300 rounded"
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      document.getElementById(`otp-reset-${index - 1}`)?.focus();
                    }
                  }}
                />
              ))}
            </div>
            <button className="btn btn-small" onClick={handleVerifyResetOtp}>
              Verify OTP
            </button>
            <p
              className="mt-3 text-blue-500 text-sm cursor-pointer underline"
              onClick={handleForgotSubmit}
            >
              Resend OTP
            </p>
          </div>
        )}

        {/* reset password */}
        {viewState === "reset" && (
          <div>
            <div className="form-row">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="full-width"
              />
            </div>
            <div className="form-row">
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                className="full-width"
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="btn btn-small"
                onClick={() => setViewState("login")}
              >
                Cancel
              </button>
              <button className="btn btn-small" onClick={handleResetPassword}>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
