import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PublicJourneys.css";
import defaultProfile from "../assets/default-profile.png";

function PublicJourneys() {
  const [journeys, setJourneys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchPublicJourneys();
  }, []);

  async function fetchPublicJourneys() {
    try {
      const response = await fetch(
        "https://heal-hub-v59o.onrender.com/api/journeys/public",
      );

      const data = await response.json();

      if (response.ok) {
        setJourneys(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const filteredJourneys =
    selectedCategory === "All"
      ? journeys
      : journeys.filter((journey) => journey.category === selectedCategory);

  return (
    <main className="public-journeys-container">
      <h1>Explore Healing Journeys</h1>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-filter"
      >
        <option>All</option>
        <option>Mental Health</option>
        <option>Physical Recovery</option>
        <option>Addiction Recovery</option>
        <option>Fitness</option>
        <option>Weight Loss</option>
        <option>Chronic Illness</option>
        <option>Personal Growth</option>
        <option>Other</option>
      </select>

      {filteredJourneys.length === 0 ? (
        <p>No public journeys found.</p>
      ) : (
        filteredJourneys.map((journey) => (
          <div className="public-journey-card" key={journey._id}>
            {journey.coverImage && (
              <img
                src={`https://heal-hub-v59o.onrender.com/uploads/${journey.coverImage}`}
                alt={journey.title}
                className="public-cover"
              />
            )}

            <h2>{journey.title}</h2>

            <p>{journey.category}</p>

            <p>{journey.description}</p>

            <div className="author-section">
              <img
                src={
                  journey.user.profileImage
                    ? `https://heal-hub-v59o.onrender.com/uploads/${journey.user.profileImage}`
                    : defaultProfile
                }
                alt="Author"
                className="author-image"
              />

              <span>
                {journey.user.name === "Anonymous"
                  ? "👤 Anonymous"
                  : journey.user.name}
              </span>
            </div>

            <Link to={`/journeys/${journey._id}`} className="view-btn">
              View Journey
            </Link>
          </div>
        ))
      )}
    </main>
  );
}

export default PublicJourneys;
