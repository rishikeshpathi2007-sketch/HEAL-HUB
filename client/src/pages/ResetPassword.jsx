import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const resetToken = location.state?.resetToken || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!resetToken) {
      alert("Your reset session is missing or expired. Please start again.");
      navigate("/forgot-password");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resetToken,
            newPassword: password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/login", { replace: true });
      } else {
        alert(data.message || "Unable to reset password.");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  if (!resetToken) {
    return (
      <main className="login-container">
        <div className="login-box">
          <h1>Reset Password</h1>
          <p className="login-text">
            Start the password reset process to continue.
          </p>
          <Link to="/forgot-password">Request password reset</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="login-container">
      <div className="login-box">
        <h1>Create New Password</h1>

        <p className="login-text">
          Choose a new password for your Heal Hub account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default ResetPassword;
