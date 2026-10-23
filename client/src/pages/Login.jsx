import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useToast } from "../ToastContext";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://heal-hub-v59o.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);

        showToast(data.message || "Login successful!", "success");

        navigate("/feed", { replace: true });
      } else {
        showToast(data.message || "Login failed. Please try again.", "error");
      }
    } catch (error) {
      console.error(error);

      showToast("Unable to connect to server.", "error");
    }
  }

  return (
    <main className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>

        <p className="login-text">Login to continue your healing journey.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p className="signup-link">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
