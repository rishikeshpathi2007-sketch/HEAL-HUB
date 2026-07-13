import { useEffect, useState } from "react";
import "../styles/Profile.css";
import defaultProfile from "../assets/default-profile.png";

function Profile() {
  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  const [name, setName] = useState("");

  const [bio, setBio] = useState("");

  const [profileImage, setProfileImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
    fetchMyPosts();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setName(data.name);
        setBio(data.bio);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMyPosts() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/profile/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile() {
    try {
      const formData = new FormData();

      formData.append("name", name);

      formData.append("bio", bio);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);

        alert("Profile updated successfully");

        fetchProfile();
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
    <main className="profile-container">
      <div className="profile-card">
        <img
          src={
            user.profileImage
              ? `http://localhost:5000/uploads/${user.profileImage}`
              : defaultProfile
          }
          alt="Profile"
          className="profile-image"
        />

        <h2>{user.name}</h2>

        <p>{user.email}</p>

        <p>{user.bio}</p>

        <div className="profile-form">
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Bio</label>

          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

          <label>Profile Picture</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />

          <button onClick={updateProfile}>Save Changes</button>
        </div>

        <div className="my-posts">
          <h2>My Posts</h2>

          {posts.length === 0 ? (
            <p>You haven't created any posts yet.</p>
          ) : (
            posts.map((post) => (
              <div className="my-post-card" key={post._id}>
                <p>{post.content}</p>

                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt="Post"
                    className="my-post-image"
                  />
                )}

                <div className="my-post-info">
                  <span>❤️ {post.likes.length}</span>

                  <span>💬 {post.comments.length}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
