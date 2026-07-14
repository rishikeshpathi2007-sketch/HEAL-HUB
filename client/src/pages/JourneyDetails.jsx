import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/JourneyDetails.css";

function JourneyDetails() {
  const { id } = useParams();

  const [journey, setJourney] = useState(null);
  const [entries, setEntries] = useState([]);

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJourney();
    fetchEntries();
  }, [id]);

  async function fetchJourney() {
    try {
      const response = await fetch(`http://localhost:5000/api/journeys/${id}`);

      const data = await response.json();

      if (response.ok) {
        setJourney(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchEntries() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/journeys/${id}/entries`,
      );

      const data = await response.json();

      if (response.ok) {
        setEntries(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addEntry() {
    if (!text.trim()) {
      alert("Please enter something.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("text", text);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `http://localhost:5000/api/journeys/${id}/entries`,
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
        setText("");
        setImage(null);

        fetchEntries();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!journey) {
    return <h2>Loading...</h2>;
  }
  async function deleteEntry(entryId) {
    const confirmDelete = window.confirm("Delete this timeline entry?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/journeys/${id}/entries/${entryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        fetchEntries();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="journey-details">
      {journey.coverImage && (
        <img
          src={`http://localhost:5000/uploads/${journey.coverImage}`}
          alt={journey.title}
          className="journey-cover"
        />
      )}

      <h1>{journey.title}</h1>

      <p>
        <strong>Category:</strong> {journey.category}
      </p>

      <p>{journey.description}</p>

      <hr />

      <h2>Healing Timeline</h2>

      {entries.length === 0 ? (
        <p>No timeline entries yet.</p>
      ) : (
        entries.map((entry) => {
          const day =
            Math.floor(
              (new Date(entry.createdAt) - new Date(journey.createdAt)) /
                (1000 * 60 * 60 * 24),
            ) + 1;

          return (
            <div className="entry-card" key={entry._id}>
              <h3>Day {day}</h3>

              <p>{entry.text}</p>

              {entry.image && (
                <img
                  src={`http://localhost:5000/uploads/${entry.image}`}
                  alt="Entry"
                  className="entry-image"
                />
              )}

              <small>{new Date(entry.createdAt).toLocaleDateString()}</small>
              <button
                className="delete-entry-btn"
                onClick={() => deleteEntry(entry._id)}
              >
                Delete Entry
              </button>
            </div>
          );
        })
      )}

      <hr />

      <h2>Add Timeline Entry</h2>

      <textarea
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={addEntry}>Add Entry</button>
    </main>
  );
}

export default JourneyDetails;
