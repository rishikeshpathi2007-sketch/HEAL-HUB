import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
        }

    }, []);

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <div className="logo">

                <Link to="/">Heal Hub</Link>

            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/feed">Community</Link>

                <Link to="/">About</Link>

            </div>

            <div className="nav-auth">

                {!isLoggedIn ? (

                    <>

                        <Link
                            to="/login"
                            className="login-link"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="signup-btn"
                        >
                            Sign Up
                        </Link>

                    </>

                ) : (

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>

    );

}

export default Navbar;