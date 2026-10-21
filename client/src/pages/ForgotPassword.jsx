import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        navigate("/verify-reset-otp", {
          state: { email: normalizedEmail },
        });
      } else {
        alert(data.message || "Unable to request password reset.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-container">
      <div className="login-box">
        <h1>Forgot Password?</h1>

        <p className="login-text">
          Enter your registered email to receive a password reset OTP.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Send Reset OTP"}
          </button>
        </form>

        <p className="signup-link">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
