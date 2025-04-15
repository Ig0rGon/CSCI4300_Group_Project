"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // For navigation
import "../styles/PostItemPage.css";

const PostItemPage = () => {
  const router = useRouter();
  // const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input
  const [formData, setFormData] = useState({
    // image: null as File | null, // Store the uploaded file
    name: "",
    price: "",
    location: "",
    lat: 0.00, //arbitrary lat and lon later get from user location or smth
    lon: 0.00,
    imageUrl: "",
    category: "" //ADD BACK
  });

  // Handle input changes for text fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] || null; // Get the selected file
  //   setFormData({ ...formData, image: file });
  // };

  //COMMENTED OUT Since this is kind of hard -> does the image loading
  // Trigger file input dialog
  // const handleAddImageClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click(); // Programmatically click the hidden file input
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the homepage with query parameters
    alert(formData.category)

    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    const result = await response.json();
    alert(result.message); // "Item posted successfully!"

    //Resets the data here
    setFormData({
      name: "",
      price: "",
      location: "",
      lat: 0.0,
      lon: 0.0,
      imageUrl: "",
      category: ""
    });


    //Goes back to root ADD this later so it goes back to home page
    router.push("/main"); 
  };

  return (
    <div className="post-item-page">
      <h1 className="post-item-title">Post Item</h1>
      <div className="post-item-form-container">
        <img
          src="/assets/logo.png"
          alt="Bulldog Market Logo"
          className="post-item-logo"
        />
        <form onSubmit={handleSubmit} className="post-item-form">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="form-row">
            <input
              type="number"
              name="price"
              placeholder="Price $"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              inputMode="decimal"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Tickets">Tickets</option>
              <option value="Household Items">Household Items</option>
              <option value="School Supplies">School Supplies</option>
              <option value="Sporting Goods">Sporting Goods</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <input
            type="text"
            name="location"
            placeholder="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          {/* Hidden file input COMMENTED OUT FOR NOW*/}
          {/* <input
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
          </button> */}
          <button type="submit" className="post-item-button">
            Post Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostItemPage;
