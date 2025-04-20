"use client";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
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
  }, [id]);

  if (!item) return <p className="text-center mt-10">Loading item...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <img src={item.imageUrl} alt={item.name} className="w-full rounded mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">{item.name}</h1>
      <p className="text-gray-600">Location: {item.location}</p>
      <p className="text-xl font-semibold">${item.price}</p>
      <p className="text-gray-500">Category: {item.category}</p>
    </div>
  );
}
