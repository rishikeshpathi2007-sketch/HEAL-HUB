import "../../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">

            <h2 className="logo">
                Heal Hub
            </h2>

            <div className="nav-links">
                <a href="#">Home</a>
                <a href="#">Community</a>
                <a href="#">About</a>
            </div>

            <div className="nav-auth">
                <a href="#">Login</a>

                <button className="signup-btn">
                    Sign Up
                </button>
            </div>

        </nav>
    );
}

export default Navbar;