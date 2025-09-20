import { useEffect, useState } from "react";
import axios from "axios";
import EditPost from "./EditPost"; // ✅ Make sure you have this file

export default function PostList({ refresh, onChanged }) {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/posts");
        console.log("Fetched posts:", res.data);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`);
      onChanged(); // refresh list after delete
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id || post._id} // ✅ supports both id and _id
            className="p-4 border rounded bg-white shadow"
          >
            {editing === (post.id || post._id) ? (
              <EditPost
                post={post}
                onCancel={() => setEditing(null)}
                onUpdated={() => {
                  setEditing(null);
                  onChanged();
                }}
              />
            ) : (
              <>
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-500 text-sm">
                  {post.created_at
                    ? `Posted on ${new Date(post.created_at).toLocaleString()}`
                    : ""}
                </p>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => setEditing(post.id || post._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(post.id || post._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
