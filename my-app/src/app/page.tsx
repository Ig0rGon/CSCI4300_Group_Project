"use client"
import connectMongoDB from "../../config/mongodb";
import LocationFinder from "./components/LocationFinder";
import Items from './components/Items';
import Card from "./components/Card";
import Item from "./models/itemSchema";
import { NextResponse } from "next/server";
import { connect } from "http2";


/** Get rid of sampleItems later
 * Just using as an example. Later this should be retrieved from MongoDB
 */

const sampleItems = [
  {
    id: "1",
    name: 'BuzzLightYear',
    price: 49.99,
    location: 'Atlanta, GA',
    imageUrl: 'https://media.gettyimages.com/id/458540731/photo/waving-buzz-lightyear-toy.jpg?s=612x612&w=gi&k=20&c=TJ7KgEXd1_kNT9uwA3cCHvh9vZfoD-c7HpHrORvvn-I='
  },
  {
    id: "2",
    name: 'BuzzLightYear 2.0',
    price: 89.99,
    location: 'Athens, GA',
    imageUrl: 'https://media.gettyimages.com/id/458540731/photo/waving-buzz-lightyear-toy.jpg?s=612x612&w=gi&k=20&c=TJ7KgEXd1_kNT9uwA3cCHvh9vZfoD-c7HpHrORvvn-I='
  },
];



export default function Home() {
  connectMongoDB();

  return (
    <div>
        // Splash Page
        <h1>Welcome!</h1>
        <Items items={sampleItems} />
        {/* <LocationFinder/> */}
    </div>
  );
};

// const getItems = async () => {
//   await connectMongoDB();

//    // READ: Get all users
//    const items = await Item.find();

//    const dbItems = items.map((item) => ({
//     id: item.id.toString(),
//     name: item.name || "Unnamed",
//     price: item.price || 0,
//     location: item.location || "Unknown",
//     imageUrl: item.imageUrl || "https://example.com/default-image.jpg",
//    }));

//    console.log("All Users:", dbItems);
// };

