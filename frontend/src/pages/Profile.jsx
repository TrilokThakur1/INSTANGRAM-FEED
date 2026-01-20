import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile({ user, setUser }) {
  const [userPosts, setUserPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL || "https://instangram-feed-backend.onrender.com";

  useEffect(() => {
    if (user?.id) {
      getUserPosts();
    }
  }, [user]);

  const getUserPosts = async () => {
    try {
      const res = await axios.get(apiUrl + "/post/list/user/" + user.id + "/");
      setUserPosts(res.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(apiUrl + `/post/delete/${postId}/`);
      setUserPosts(userPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-gray-50/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column: Profile Card */}
        <div className="w-full md:w-1/3 sticky top-24">
          <div className="w-full relative group">
            {/* ... (existing profile card style kept mostly same but responsive width) ... */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-violet-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="px-8 pb-8">
                <div className="relative -mt-16 mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur opacity-75"></div>
                    <img 
                      className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover" 
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`} 
                      alt={user.fullName} 
                    />
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.fullName}</h1>
                  <p className="text-gray-500 font-medium">{user.email}</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase">Member</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      setUser(null);
                    }}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: User Posts */}
        <div className="w-full md:w-2/3">
           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
             <span>My Posts</span>
             <span className="bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded-full">{userPosts.length}</span>
           </h2>

           <div className="grid gap-6">
             {userPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                  <div className="flex">
                    {post.image && (
                      <div className="w-1/3 min-h-[150px]">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`p-6 ${post.image ? 'w-2/3' : 'w-full'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{post.title}</h3>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                      <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
                      <div className="text-xs text-gray-400 font-medium">
                        Posted by You
                      </div>
                    </div>
                  </div>
                </div>
             ))}

             {userPosts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                   <p>You haven't posted anything yet.</p>
                </div>
             )}
           </div>
        </div>

      </div>
    </div>
  )
}
