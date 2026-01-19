import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
  const [user, setUser] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
  const [posts, setPosts] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const getPosts = async () => {
    try {
      let res = await axios.get(apiUrl + "/post/list/");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  async function handlePost(e) {
    e.preventDefault();
    setIsPosting(true);

    let data = {
      title: e.target[0].value,
      image: e.target[1].value,
      content: e.target[2].value,
      author_id: user.id,
    };

    try {
      await axios.post(apiUrl + "/post/create/", data);
      e.target.reset();
      await getPosts(); // Wait for fetch before finishing state
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  }

  async function handleDelete(postId) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(apiUrl + `/post/delete/${postId}/`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 pt-24">
      
      {/* Compose Post Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 mb-6 relative z-10">
          Create a Post
        </h2>
        <form onSubmit={handlePost} className="flex flex-col gap-4 relative z-10">
          <input
            type="text"
            placeholder="What's on your mind? (Title)"
            className="p-4 bg-white/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Image URL (Unsplash, etc.)"
            className="p-4 bg-white/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-400"
          />
          <textarea
            placeholder="Share your thoughts..."
            rows="3"
            className="p-4 bg-white/50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder-gray-400"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isPosting}
            className="self-end px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {isPosting ? "Posting..." : "Share Post"}
          </button>
        </form>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      {/* Feed Header */}
      <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Latest Updates</h1>
         <div className="bg-white/50 px-3 py-1 rounded-full text-sm font-medium text-gray-500 border border-white/50 backdrop-blur-sm">Live Feed</div>
      </div>

      {/* Post List */}
      <div className="grid gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/80 backdrop-blur-md border border-white/60 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            {/* Author Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-100/50 bg-white/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-blue-500 to-violet-500">
                  <img
                    src={post.author?.avatar || `https://ui-avatars.com/api/?name=${post.author?.fullName || 'User'}&background=random`}
                    alt={post.author?.fullName}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-tight">{post.author?.fullName || "Unknown User"}</p>
                  <p className="text-xs text-blue-600 font-semibold tracking-wide">AUTHOR</p>
                </div>
              </div>
              
              {/* Delete Button (Only for Author) */}
              {(function() {
                const authorId = post.author?.id || post.author;
                const userId = user?.id;
                // Loose equality for string/number mismatch
                return userId == authorId; 
              })() && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Post"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              )}
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="w-full bg-gray-100 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Post Body */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-600 leading-relaxed">{post.content}</p>
            </div>
            
            {/* Footer Interaction Placeholder */}
            <div className="px-6 py-4 border-t border-gray-100/50 bg-gray-50/50 flex gap-4">
               <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition group/heart">
                  <svg className="w-5 h-5 group-hover/heart:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span className="text-sm font-medium">Like</span>
               </button>
               <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-36 8-8 8a8.013 8.013 0 01-5.45-2.125L3 19l2-5a8.015 8.015 0 01-5-7.9 0L12 3a8 8 0 019 9z" /></svg>
                  <span className="text-sm font-medium">Comment</span>
               </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-16 text-gray-400 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <p className="text-xl font-medium">No posts yet.</p>
            <p className="text-sm mt-1">Be the first to share something amazing!</p>
          </div>
        )}
      </div>
    </div>
  );
}
