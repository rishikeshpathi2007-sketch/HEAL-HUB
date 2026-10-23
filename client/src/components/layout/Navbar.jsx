// import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import defaultProfile from "../../assets/default-profile.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" aria-label="Heal Hub home">
          <img src="/heal-hub-logo.png" alt="Heal Hub" />
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/feed">Community</NavLink>

        <NavLink to="/journeys" end>
          My Journeys
        </NavLink>

        <NavLink to="/journeys/public">Explore Journeys</NavLink>

        <NavLink to="/about">About</NavLink>
      </div>

      <div className="nav-auth">
        {!user ? (
          <>
            <Link to="/login" className="navbar-login-btn">
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
                    ? `https://heal-hub-v59o.onrender.com/uploads/${user.profileImage}`
                    : defaultProfile
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
