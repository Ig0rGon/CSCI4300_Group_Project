"use client";
import React, { useEffect, useState } from "react";
import MapWithDirections from "./MapWithDirections"; // Import the MapWithDirections component

interface Item {
  _id: string;
  name: string;
  price: number;
  location: string;
  lat: number;
  lon: number;
  imageUrl: string;
  category: string;
}

export default function SpecificItem({ id }: { id: string }) {
  const [item, setItem] = useState<Item | null>(null);
  const [buyerLocation, setBuyerLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Fetch the item details
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) {
          console.error("Fetch failed with status:", res.status);
          return;
        }
  
        const data = await res.json();
        console.log("Fetched item is:", data);
        setItem(data.item);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
  
    fetchItem();

    // Fetch the buyer's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBuyerLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error("Error fetching buyer's location:", error);
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, [id]);

  if (!item) return <p className="text-center mt-10">Loading item...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <img src={item.imageUrl} alt={item.name} className="w-full rounded mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">{item.name}</h1>
      <p className="text-gray-600">Location: {item.location}</p>
      <p className="text-xl font-semibold">${item.price}</p>
      <p className="text-gray-500">Category: {item.category}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Directions to Seller</h2>
        {buyerLocation ? (
          <MapWithDirections
            sellerLocation={[item.lon, item.lat]}
            buyerLocation={buyerLocation} // Pass buyer's location as a prop
          />
        ) : (
          <p>Loading your location...</p>
        )}
      </div>
    </div>
  );
}
