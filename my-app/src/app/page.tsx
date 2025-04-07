"use client"
import connectMongoDB from "../../config/mongodb";
import { NextResponse } from "next/server";

//Components
import Items from './components/Items';
import Location from "./components/Location"

//Models
import Item from "./models/itemSchema";



/** Get rid of sampleItems later
 * Just using as an example. Later this should be retrieved from MongoDB
 */

const sampleItems = [
  {
    id: "1",
    name: 'BuzzLightYear',
    price: 49.99,
    location: 'Atlanta, GA',
    lat: 33.93904,
    lon: -83.37061,
    imageUrl: 'https://media.gettyimages.com/id/458540731/photo/waving-buzz-lightyear-toy.jpg?s=612x612&w=gi&k=20&c=TJ7KgEXd1_kNT9uwA3cCHvh9vZfoD-c7HpHrORvvn-I='
  },
  {
    id: "2",
    name: 'BuzzLightYear 2.0',
    price: 89.99,
    location: 'Athens, GA',
    lat: 33.93904,
    lon: -83.37061,
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
        <Location></Location>
    </div>
  );
};

// };

