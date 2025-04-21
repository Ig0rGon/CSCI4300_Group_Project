"use client"

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Items from "../components/Items";
import Image from "next/image";
import "../styles/Items.css";

// Interface for Item
interface ItemType {
  _id: string;
  name: string;
  price: number;
  location: string;
  lat: number;
  lon: number;
  imageUrl: string;
  category: string;
}

export default function HomePage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const logoclicked = () => {
    setSelectedCategory("All");
  }

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex h-screen">
      <Sidebar onCategoryClick={handleCategoryClick}/>
      <div className="flex flex-col flex-1">
        <Navbar onLogoClick={logoclicked}/>
        <div className="items-container">
          {loading ? (
            <p className="flex items-center gap-2 text-lg text-gray-600">
            Loading items...
            <Image
              src="/assets/loading.gif"
              alt="Loading spinner"
              width={40}
              height={40}
              unoptimized
            />
          </p>
          ) : (
            <Items items={filteredItems} />
          )}
        </div>
      </div>
    </div>
  );
}
