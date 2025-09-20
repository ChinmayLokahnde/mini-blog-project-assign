import { useState } from "react";
import CreatePost from "./components/createPost";
import PostList from "./components/PostList";


function App() {
  const [refresh, setRefresh] = useState(false);


  return (
     <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Blogging Platform</h1>
      <CreatePost onPostCreated={() => setRefresh(!refresh)} />
      <div className="mt-6">
        <PostList refresh={refresh} onChanged={() => setRefresh(!refresh)} />
      </div>
    </div>
  )
}

export default App
