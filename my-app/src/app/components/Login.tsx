import React from "react";

export default function LoginPage() {
    
    const signupClicked = () => {
        window.location.href = "/sign-up";
    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-red-700">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
          Bulldog Login
        </h1>
        <form className="space-y-4">
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
              placeholder="Your password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4" onClick={signupClicked}>
          Don't have an account? <span className="text-red-700 font-semibold cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
}