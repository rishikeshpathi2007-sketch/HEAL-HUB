import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Journey.css";

function Journey() {
  const [journeys, setJourneys] = useState([]);

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("Mental Health");

  const [description, setDescription] = useState("");

  const [coverImage, setCoverImage] = useState(null);

  const [isPublic, setIsPublic] = useState(true);
  const [showIdentity, setShowIdentity] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJourneys();
  }, []);

  async function fetchJourneys() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/journeys/mine",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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

  async function createJourney() {
    if (!title.trim()) {
      alert("Title is required");

      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);

      formData.append("category", category);

      formData.append("description", description);

      formData.append("isPublic", isPublic);

      formData.append("showIdentity", showIdentity);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await fetch(
        "http://localhost:5000/api/journeys",

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        setTitle("");

        setCategory("Mental Health");

        setDescription("");

        setCoverImage(null);

        setIsPublic(true);

        setShowIdentity(true);

        fetchJourneys();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteJourney(id) {
    const confirmDelete = window.confirm("Delete this journey?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/journeys/${id}`,

        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        fetchJourneys();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="journey-container">
      <section className="create-journey">
        <h2>Create Healing Journey</h2>

        <input
          type="text"
          placeholder="Journey title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Mental Health</option>

          <option>Physical Recovery</option>

          <option>Addiction Recovery</option>

          <option>Fitness</option>

          <option>Weight Loss</option>

          <option>Chronic Illness</option>

          <option>Personal Growth</option>

          <option>Other</option>
        </select>

        <textarea
          placeholder="Describe your journey..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />

        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public Journey
        </label>
        <label>
          <input
            type="checkbox"
            checked={showIdentity}
            disabled={!isPublic}
            onChange={(e) => setShowIdentity(e.target.checked)}
          />
          Show my identity
        </label>

        <button onClick={createJourney}>Create Journey</button>
      </section>

      <section className="journey-list">
        <h2>My Journeys</h2>

        {journeys.length === 0 ? (
          <p>No journeys created yet.</p>
        ) : (
          journeys.map((journey) => (
            <div className="journey-card" key={journey._id}>
              {journey.coverImage && (
                <img
                  src={`http://localhost:5000/uploads/${journey.coverImage}`}
                  alt="Journey"
                  className="journey-cover"
                />
              )}

              <h3>{journey.title}</h3>

              <p>{journey.category}</p>

              <p>{journey.description}</p>

              <div className="journey-actions">
                <Link
                  to={`/journeys/${journey._id}`}
                  className="view-journey-btn"
                >
                  View Journey
                </Link>

                <button
                  className="delete-journey-btn"
                  onClick={() => deleteJourney(journey._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Journey;
