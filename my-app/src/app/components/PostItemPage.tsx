"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // For navigation
import "../styles/PostItemPage.css";

const PostItemPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null); 
  // const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the hidden file input
  const [formData, setFormData] = useState({
    // image: null as File | null, // Store the uploaded file
    name: "",
    price: "",
    location: "",
    lat: 0.0, //arbitrary lat and lon later get from user location or smth
    lon: 0.0,
    imageUrl: "",
    category: "", //ADD BACK
  });

  const [useManualLocation, setUseManualLocation] = useState(false); // Toggle for manual location input

  // Handle input changes for text fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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


  // Function to get user's current location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          alert(
            `Location obtained: Lat ${position.coords.latitude}, Lon ${position.coords.longitude}`
          );
        },
        (error) => {
          console.error("Error obtaining location:", error);
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Function to fetch latitude and longitude from a manual location input using Mapbox Geocoding API
  const handleFetchLatLon = async () => {
    if (!formData.location) {
      alert("Please enter a location.");
      return;
    }

    try {
      const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Replace with your Mapbox access token
      if (!mapboxAccessToken) {
        throw new Error('Mapbox access token is not defined in environment variables.');
      }
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          formData.location
        )}.json?access_token=${mapboxAccessToken}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location data.");
      }

      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].center; // Extract longitude and latitude
        setFormData({ ...formData, lat, lon });
        alert(`Location set: Lat ${lat}, Lon ${lon}`);
      } else {
        alert("No results found for the entered location.");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      alert("Failed to fetch location data. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the homepage with query parameters

    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    //Resets the data here
    setFormData({
      name: "",
      price: "",
      location: "",
      lat: 0.0,
      lon: 0.0,
      imageUrl: "",
      category: "",
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
        <button
          type="button"
          onClick={() => router.push("/main")}
          className="text-red-700 underline mb-4 hover:text-red-900 self-start"
        >
          Back to Marketplace
        </button>
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
            placeholder="Location (City/Address)"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* Toggle between manual location and current location */}
          <div className="location-options">
            <label>
              <input
                type="checkbox"
                checked={useManualLocation}
                onChange={() => setUseManualLocation(!useManualLocation)}
              />
              Use Manual Location
            </label>
          </div>

          {useManualLocation ? (
            <button
              type="button"
              className="fetch-location-button uga-button"
              onClick={handleFetchLatLon}
            >
              Fetch Latitude and Longitude
            </button>
          ) : (
            <button
              type="button"
              className="get-location-button uga-button"
              onClick={handleGetLocation}
            >
              Get My Current Location
            </button>
          )}

          {/* Display user's latitude and longitude */}
          {formData.lat !== 0.0 && formData.lon !== 0.0 && (
            <p>
              Latitude: {formData.lat}, Longitude: {formData.lon}
            </p>
          )}

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
