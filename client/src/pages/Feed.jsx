import { useEffect, useState } from "react";
import "../styles/Feed.css";

function Feed() {

    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    async function fetchPosts() {

        try {

            const response = await fetch(
                "http://localhost:5000/api/posts"
            );

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

                }

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

            "Are you sure you want to delete this post?"

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

                }

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

                <button onClick={createPost}>
                    Post
                </button>

            </section>

            <section className="posts">

                {posts.map((post) => (

                    <div
                        className="post-card"
                        key={post._id}
                    >

                        <h3>{post.author.name}</h3>

                        <p>{post.content}</p>

                        {post.image && (

                            <img
                                src={`http://localhost:5000/uploads/${post.image}`}
                                alt="Post"
                                className="post-image"
                            />

                        )}

                        {user && user.id === post.author._id && (

                            <button
                                className="delete-btn"
                                onClick={() => deletePost(post._id)}
                            >
                                Delete
                            </button>

                        )}

                        <div className="post-actions">

                            <span>
                                ❤️ {post.likes.length}
                            </span>

                            <span>
                                💬 {post.comments.length}
                            </span>

                        </div>

                    </div>

                ))}

            </section>

        </main>

    );

}

export default Feed;