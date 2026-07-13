import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png";
import "../styles/UserProfile.css";

function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUser();
  }, [id]);

  async function fetchUser() {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`);

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setPosts(data.posts);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="user-profile-container">
      <section className="user-profile-card">
        <img
          src={
            user.profileImage
              ? `http://localhost:5000/uploads/${user.profileImage}`
              : defaultProfile
          }
          alt="Profile"
          className="user-profile-image"
        />

        <h2>{user.name}</h2>

        <p>{user.email}</p>

        <p>{user.bio || "No bio available."}</p>
      </section>

      <section className="user-posts">
        <h2>Posts</h2>

        {posts.length === 0 ? (
          <p>This user has not posted anything yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="user-post-card">
              <p>{post.content}</p>

              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt="Post"
                  className="user-post-image"
                />
              )}

              <div className="post-actions">
                <span>❤️ {post.likes.length}</span>

                <span>💬 {post.comments.length}</span>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default UserProfile;
