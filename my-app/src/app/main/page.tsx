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
}

export default function HomePage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="items-container">
          {loading ? (
            <p>
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
            <Items items={items} />
          )}
        </div>
      </div>
    </div>
  );
}
