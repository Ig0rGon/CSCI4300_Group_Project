"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete the item");
      }

      alert("Item deleted successfully");
      router.push("/main"); // Go back to the main page after delete
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item.");
    }
  };

  const handleEdit = () => {
    router.push(`/edit/${id}`); // assumes you have this page
  };

  if (!item) return <p className="text-center mt-10">Loading item...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <button
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/main")}
        className="mb-4 text-red-700 underline hover:text-red-900"
      >
        ← Back to Marketplace
      </button>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full rounded mb-4"
      />
      <h1 className="text-3xl font-bold text-red-700 mb-2">{item.name}</h1>
      <p className="text-gray-600">Location: {item.location}</p>
      <p className="text-xl font-semibold">${item.price}</p>
      <p className="text-gray-500">Category: {item.category}</p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
