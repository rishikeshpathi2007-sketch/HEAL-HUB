import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

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
        {!user ? (
          <>
            <Link to="/login" className="login-link">
              Login
            </Link>

            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="profile-link">
              <img
                src={
                  user.profileImage
                    ? `http://localhost:5000/uploads/${user.profileImage}`
                    : "https://via.placeholder.com/40"
                }
                alt="Profile"
                className="navbar-profile-image"
              />

              <span>{user.name}</span>
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
