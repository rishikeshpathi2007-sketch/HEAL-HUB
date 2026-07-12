import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);

                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Unable to connect to server.");
        }
    }

    return (
        <main className="signup-container">
            <div className="signup-box">

                <h1>Create Account</h1>

                <p className="signup-text">
                    Join Heal Hub and start your healing journey.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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
                                placeholder="Create a password"
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

                    <div className="input-group">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="signup-btn"
                    >
                        Sign Up
                    </button>

                </form>

                <p className="login-link">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </div>
        </main>
    );
}

export default Signup;