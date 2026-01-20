import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Auth({ user, setUser }) {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "https://instangram-feed-backend.onrender.com";

  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"))

    if(!user && saved){
      setUser(saved)
      navigate("/Profile")
    }

    if(user) navigate("/Profile")
  }, []);

async function handleLoginSubmit(e) {
  e.preventDefault();

  let data = {
    email: e.target[0].value,      // ✅ email
    password: e.target[1].value,
  };

  try {
    let res = await axios.post(`${apiUrl}/user/login/`, data);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
    navigate("/");
  } catch (error) {
    if (error.response?.status === 400) {
      alert("Invalid Email or Password");
    } else {
      alert("Login error");
    }
  }
}
  
  async function handleregiterSubmit(e) {
    e.preventDefault()
    let data ={
      fullName: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      avatar: e.target[3].value
    }
    try {
      let res = await axios.post(`${apiUrl}/user/register/`, data)
      localStorage.setItem("user", JSON.stringify(res.data))

      setUser(res.data)
      navigate("/Profile")
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup error. Please try again.");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

      <div className="w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden relative">
          
          {/* Header & Toggle */}
          <div className="p-8 pb-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 tracking-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">INSTAGRAM </span>
            </h1>

            <div className="flex p-1 bg-gray-100/80 rounded-xl relative">
              <div 
                className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out transform ${isLoginView ? 'translate-x-1 left-0' : 'translate-x-full left-[-4px]'}`}
              ></div>
              <button 
                onClick={() => setIsLoginView(true)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors ${isLoginView ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Log In
              </button>
              <button 
                onClick={() => setIsLoginView(false)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg relative z-10 transition-colors ${!isLoginView ? 'text-violet-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="px-8 pb-8 pt-2">
            
            {/* LOGIN FORM */}
            <div className={`transition-all duration-300 ${isLoginView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full hidden'}`}>
              <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Log In
                </button>
              </form>
            </div>

            {/* SIGNUP FORM */}
            <div className={`transition-all duration-300 ${!isLoginView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full hidden'}`}>
              <form onSubmit={handleregiterSubmit} className="flex flex-col space-y-4">
                 <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide ml-1">Avatar URL</label>
                  <input
                    type="text"
                    placeholder="https://schema.org/AboutPage"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all font-medium placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Create Account
                </button>
              </form>
            </div>

          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm font-medium">
          {isLoginView ? "Don't have an account?" : "Already have an account?"} 
          <button 
            onClick={() => setIsLoginView(!isLoginView)} 
            className={`ml-1 font-bold hover:underline ${isLoginView ? 'text-blue-600' : 'text-violet-600'}`}
          >
            {isLoginView ? "Sign up" : "Log in"}
          </button>
        </p>

      </div>
    </div>
  );
}
