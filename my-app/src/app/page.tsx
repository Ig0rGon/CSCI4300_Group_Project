"use client"
import connectMongoDB from "../../config/mongodb";
import LocationFinder from "./components/LocationFinder";

export default function Home() {
  connectMongoDB();

  return (
    <div>
        <h1>Welcome!</h1>
        <LocationFinder/>
    </div>
  );
}
