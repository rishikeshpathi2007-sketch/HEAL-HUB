import "../styles/About.css";

function About() {
  return (
    <main className="about-container">
      <h1>About Heal Hub</h1>

      <p className="about-text">
        Heal Hub is a supportive platform where people can share experiences,
        document healing journeys, and connect with others while maintaining
        control over their privacy.
      </p>

      <section className="about-section">
        <h2>What You Can Do</h2>

        <div className="feature-card">
          <h3>📝 Share Posts</h3>

          <p>
            Express your thoughts and recovery experiences with the community.
          </p>
        </div>

        <div className="feature-card">
          <h3>📖 Healing Journeys</h3>

          <p>
            Create a personal timeline and record your progress one day at a
            time.
          </p>
        </div>

        <div className="feature-card">
          <h3>🌍 Explore Journeys</h3>

          <p>Read inspiring stories shared by other members.</p>
        </div>

        <div className="feature-card">
          <h3>🔒 Anonymous Sharing</h3>

          <p>
            Keep your identity private while sharing your healing journey
            publicly.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Built With</h2>

        <ul className="tech-list">
          <li>React</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>JWT Authentication</li>
        </ul>
      </section>

      <p className="quote">"Every small step is still progress."</p>
    </main>
  );
}

export default About;
