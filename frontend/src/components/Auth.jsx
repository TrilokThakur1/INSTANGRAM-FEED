import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Auth({ user, setUser }) {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

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
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      let res = await axios.post(`${apiUrl}/user/login`, data);
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        navigate("/");
      } else {
        alert("Login failed. Please check credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login error. Please try again.");
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
      let res = await axios.post(`${apiUrl}/user/register`, data)
      localStorage.setItem("user", JSON.stringify(res.data))

      setUser(res.data)
      navigate("/Profile")
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup error. Please try again.");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div
        id="TabView"
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg flex flex-col items-center"
      >
        {/* LOGIN SECTION */}
        <div id="Login" className="w-full mb-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4 w-full items-center">
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition w-full text-center"
            >
              Login
            </button>
          </form>
        </div>

        {/* SIGNUP SECTION */}
        <div id="SignUp" className="w-full flex flex-col items-center border-t pt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

          <form onSubmit={handleregiterSubmit} className="flex flex-col space-y-4 w-full items-center">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Avatar (URL)"
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition w-full text-center"
            >
              Sign Up
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
