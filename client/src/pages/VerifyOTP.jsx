import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/VerifyOTP.css";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  async function handleVerify() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);

        alert(data.message);

        navigate("/feed");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="otp-container">
      <div className="otp-box">
        <h1>Verify Email</h1>

        <p>Enter the OTP sent to</p>

        <strong>{email}</strong>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify}>Verify</button>
      </div>
    </main>
  );
}

export default VerifyOTP;
