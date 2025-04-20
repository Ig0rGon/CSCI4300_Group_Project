"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";



export default function SignupPage() {

  const loginClicked = () => {
    window.location.href = "/login"; //This hard resets the page and fixes styling errors
  };

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    const result = await response.json();


    if (!response.ok) {
      alert("Error: " + result.message);
      return;
    }

    alert(result.message); // "Item posted successfully!"

    //Resets the data here
    setFormData({
      username: "",
      email: "",
      password: ""
    });

    router.push("/login");
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-red-700">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
          Bulldog Sign Up
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Your username"
              onChange={handleChange}
              value={formData.username}
              name="username"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Your email"
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Create a password"
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p
          className="text-center text-sm text-gray-500 mt-4"
          onClick={loginClicked}
        >
          Already have an account?{" "}
          <span className="text-red-700 font-semibold cursor-pointer">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
