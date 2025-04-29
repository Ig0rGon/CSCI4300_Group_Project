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

export default function EditItem({ id }: { id: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/items/${id}`);
      const data = await res.json();
      setFormData(data.item); // adjust if your API doesn't nest
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Item updated!");
      router.push(`/items/${id}`);
    } else {
      alert("Failed to update item.");
    }
  };

  if (loading || !formData)
    return <p className="text-center mt-10">Loading form...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-red-700 mb-6">Edit Item</h1>
      <button
        onClick={() => router.push("/main")}
        type="button"
        className="mb-4 text-red-700 underline hover:text-red-900"
      >
        ← Back to Marketplace
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price ?? ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          min="0"
          step="0.01"
          inputMode="decimal"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        >
          <option value="Household Items">Household Items</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Sporting Goods">Sporting Goods</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Pet Supplies">Pet Supplies</option>
          <option value="Tickets">Tickets</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
