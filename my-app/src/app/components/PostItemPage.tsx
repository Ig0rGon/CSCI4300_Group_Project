"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // For navigation
import "../styles/PostItemPage.css";

const PostItemPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input
  const [formData, setFormData] = useState({
    image: null as File | null, // Store the uploaded file
    price: "",
    category: "",
    title: "",
    location: "",
  });

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the selected file
    setFormData({ ...formData, image: file });
  };

  // Trigger file input dialog
  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the hidden file input
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to the homepage with query parameters
    const queryParams = new URLSearchParams({
      title: formData.title,
      price: formData.price,
      category: formData.category,
      location: formData.location,
    });

    router.push(`/?${queryParams.toString()}`);
  };

  return (
    <div className="post-item-page">
      <h1 className="post-item-title">Post Item</h1>
      <div className="post-item-form-container">
        <img src="/logo.png" alt="Bulldog Market Logo" className="post-item-logo" />
        <form onSubmit={handleSubmit} className="post-item-form">
          
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          {/* Hidden file input */}
          <input
            type="file"
            name="image"
            accept="image/*" // Restrict to image files
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the file input
          />
          <button
            type="button"
            className="add-image-button"
            onClick={handleAddImageClick}
          >
            Add Image
          </button>
          <button type="submit" className="post-item-button">Post Item</button>
        </form>
      </div>
    </div>
  );
};

export default PostItemPage;