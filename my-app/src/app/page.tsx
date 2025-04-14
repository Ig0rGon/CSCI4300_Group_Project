"use client";

import React from "react";
import Navbar from "../app/components/Navbar";
import Sidebar from "../app/components/Sidebar";
import Items from "./components/Items";
import './styles/Items.css'


// Sample Items we will get rid of this soon once I start pulling from data base
const sampleItems = [
  {
    _id: "1",
    name: "BuzzLightYear",
    price: 49.99,
    location: "Atlanta, GA",
    lat: 33.93904,
    lon: -83.37061,
    imageUrl:
      "https://media.gettyimages.com/id/458540731/photo/waving-buzz-lightyear-toy.jpg?s=612x612&w=gi&k=20&c=TJ7KgEXd1_kNT9uwA3cCHvh9vZfoD-c7HpHrORvvn-I=",
  },
  {
    _id: "2",
    name: "BuzzLightYear 2.0",
    price: 89.99,
    location: "Athens, GA",
    lat: 33.93904,
    lon: -83.37061,
    imageUrl:
      "https://media.gettyimages.com/id/458540731/photo/waving-buzz-lightyear-toy.jpg?s=612x612&w=gi&k=20&c=TJ7KgEXd1_kNT9uwA3cCHvh9vZfoD-c7HpHrORvvn-I=",
  },
];

//Structured to add items in the correct area
const HomePage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="items-container">
          <Items items={sampleItems}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
