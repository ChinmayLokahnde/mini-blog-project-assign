import { useState } from "react";
import axios from "axios";

export default function EditPost({ post, onCancel, onUpdated }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/posts/${post.id}`, { title, content });
    onUpdated();
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 p-4 border rounded">
      <input
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Update
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
