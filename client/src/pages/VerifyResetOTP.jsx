import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function VerifyResetOTP() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      alert("Please start from the Forgot Password page.");
      navigate("/forgot-password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-reset-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otp.trim() }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/reset-password", {
          state: { resetToken: data.resetToken },
        });
      } else {
        alert(data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  if (!email) {
    return (
      <main className="login-container">
        <div className="login-box">
          <h1>Verify OTP</h1>
          <p className="login-text">Start by requesting a password reset.</p>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="login-container">
      <div className="login-box">
        <h1>Verify Reset OTP</h1>

        <p className="login-text">Enter the six-digit code sent to {email}.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>OTP</label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              pattern="[0-9]{6}"
              maxLength={6}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="signup-link">
          <Link to="/forgot-password">Request another OTP</Link>
        </p>
      </div>
    </main>
  );
}

export default VerifyResetOTP;
