import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import defaultProfile from "../../assets/default-profile.png";
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
        <Link to="/">Heal Hub</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/feed">Community</Link>

        <>
          <Link to="/journeys">My Journeys</Link>

          <Link to="/journeys/public">Explore Journeys</Link>
        </>

        <Link to="/about">About</Link>
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
                    ? `http://localhost:5000/uploads/${user.profileImage}`
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
