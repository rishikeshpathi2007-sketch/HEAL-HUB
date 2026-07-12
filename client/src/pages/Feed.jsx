import { useEffect, useState } from "react";
import "../styles/Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  async function fetchPosts() {
    try {
      const response = await fetch("http://localhost:5000/api/posts");

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function createPost() {
    if (!content.trim()) {
      alert("Post cannot be empty");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        "http://localhost:5000/api/posts",

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
        setContent("");
        setImage(null);

        fetchPosts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(postId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,

        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        fetchPosts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function startEditing(post) {
    setEditingPostId(post._id);
    setEditContent(post.content);
    setEditImage(null);
  }

  function cancelEditing() {
    setEditingPostId(null);
    setEditContent("");
    setEditImage(null);
  }

  async function updatePost(postId) {
    if (!editContent.trim()) {
      alert("Post cannot be empty");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("content", editContent);

      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,

        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok) {
        setEditingPostId(null);
        setEditContent("");
        setEditImage(null);

        fetchPosts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function toggleLike(postId) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/like`,

        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        fetchPosts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="feed-container">
      <section className="create-post">
        <h2>Create a Post</h2>

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={createPost}>Post</button>
      </section>

      <section className="posts">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <h3>{post.author.name}</h3>

            {editingPostId === post._id ? (
              <>
                <textarea
                  className="edit-textarea"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />

                <div className="edit-buttons">
                  <button
                    className="save-btn"
                    onClick={() => updatePost(post._id)}
                  >
                    Save
                  </button>

                  <button className="cancel-btn" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{post.content}</p>

                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt="Post"
                    className="post-image"
                  />
                )}

                {user && user.id === post.author._id && (
                  <div className="owner-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(post)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deletePost(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}

            <div className="post-actions">
              <button
                className={
                  user && post.likes.includes(user.id)
                    ? "like-btn liked"
                    : "like-btn"
                }
                onClick={() => toggleLike(post._id)}
              >
                ❤️ {post.likes.length}
              </button>

              <span>💬 {post.comments.length}</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Feed;
