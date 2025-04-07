"use client";
import connectMongoDB from "../../config/mongodb";
import { NextResponse } from "next/server";
import React, { useEffect, useState } from "react";

//Components
import Items from "./components/Items";
import Location from "./components/Location";

//Models
import Item from "./models/itemSchema";

/** Get rid of sampleItems later
 * Just using as an example. Later this should be retrieved from MongoDB
 */

// const sampleItems = [
//   {
//     id: "1",
//     name: 'BuzzLightYear',
//     price: 49.99,
//     location: 'Atlanta, GA',
//     lat: 33.93904,
//     lon: -83.37061,
//     imageUrl: 'https://media.gettyimages.com/id/458540731/photo/waving-buzz-lightyear-toy.jpg?s=612x612&w=gi&k=20&c=TJ7KgEXd1_kNT9uwA3cCHvh9vZfoD-c7HpHrORvvn-I='
//   },
//   {
//     id: "2",
//     name: 'BuzzLightYear 2.0',
//     price: 89.99,
//     location: 'Athens, GA',
//     lat: 33.93904,
//     lon: -83.37061,
//     imageUrl: 'https://media.gettyimages.com/id/458540731/photo/waving-buzz-lightyear-toy.jpg?s=612x612&w=gi&k=20&c=TJ7KgEXd1_kNT9uwA3cCHvh9vZfoD-c7HpHrORvvn-I='
//   },
// ];

// Interface for Item
interface ItemType {
  id: string;
  name: string;
  price: number;
  location: string;
  lat: number;
  lon: number;
  imageUrl: string;
}

export default function Home() {
  // This fetches the data of the items from mongoDB
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

  connectMongoDB();

  return (
    <div>
      // Splash Page
      <h1>Welcome!</h1>
      {loading ? <p>Loading items...</p> : <Items items={items} />}
      <Location></Location>
    </div>
  );
}
