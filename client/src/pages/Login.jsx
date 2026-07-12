import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                alert(data.message);

                navigate("/feed");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to server.");

        }

    }

    return (

        <main className="login-container">

            <div className="login-box">

                <h1>Welcome Back</h1>

                <p className="login-text">
                    Login to continue your healing journey.
                </p>

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
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>

                </form>

                <p className="signup-link">

                    Don't have an account?

                    <Link to="/signup">
                        {" "}Sign Up
                    </Link>

                </p>

            </div>

        </main>

    );

}

export default Login;