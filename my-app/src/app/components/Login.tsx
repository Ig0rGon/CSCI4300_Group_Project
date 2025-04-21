"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const signupClicked = () => {
    window.location.href = "/sign-up";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/main")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-700">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
          Bulldog Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Your password"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition"
            >
              Log In
            </button>
          </div>
        </form>
        <p
          className="text-center text-sm text-gray-500 mt-4"
          onClick={signupClicked}
        >
          Don't have an account?{" "}
          <span className="text-red-700 font-semibold cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
