import { useState } from "react";
import axios from 'axios';

export default function CreatePost({onPostCreated}){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!title || !content) return alert("title & content are required");
        await axios.post("http://localhost:8000/posts", {title, content});
        setTitle("");
        setContent("");
        onPostCreated();
    };

    return(
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
            <input 
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />
            <textarea
            className="w-full p-2 border rounded"
            rows= "4"
            placeholder="Enter Content"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" 
            type="submit">
               Create Post
            </button>
        </form>
    );
}