"use client";
import React from "react";

export default function SignupPage() {

  const loginClicked = () => {
    window.location.href = "/login"; //This hard resets the page and fixes styling errors
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-red-700">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
          Bulldog Sign Up
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Create a password"
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
