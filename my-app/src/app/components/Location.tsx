'use client';
import React, { useState, useEffect } from "react";

// Haversine formula to calculate distance
const getDistance = (
  lat1: number, // latitude of user
  lon1: number, //longitude of user
  lat2: number, //latitude of item from mongoDB
  lon2: number  //longitude of item from mongoDB
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 3958.8; // Earth radius in miles

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Component to fetch user's current location
function LocationFetcher({
  onLocationFetched,
}: {
  onLocationFetched: (lat: number, lon: number) => void;
}) {
  useEffect(() => {
    if (navigator.geolocation) { //if location is enabled
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationFetched(latitude, longitude);
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [onLocationFetched]);
  // Shows fetching data first
  return <p className="text-gray-400">Fetching location...</p>;
}

// Main App Component
export default function Location() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  // Later implement this code to get lat and lon from current user
  const targetCoords = { lat: 33.9475, lon: -83.3578 }; // lat and lon of Athens GA
 
  const distance =
    coords?.lat && coords?.lon
      ? getDistance(coords.lat, coords.lon, targetCoords.lat, targetCoords.lon).toFixed(2)
      : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">📍 Location Info</h1>
        {!coords && (
          <LocationFetcher onLocationFetched={(lat, lon) => setCoords({ lat, lon })} />
        )}
        {coords && (
          <>
            <p className="text-lg">
              🌐 Latitude: <span className="font-semibold">{coords.lat.toFixed(5)}</span>
            </p>
            <p className="text-lg">
              🌐 Longitude: <span className="font-semibold">{coords.lon.toFixed(5)}</span>
            </p>
            <p className="text-lg mt-4">📏 Distance to Target:</p>
            <p className="text-3xl font-bold text-blue-400">{distance} miles</p>
          </>
        )}
      </div>
    </div>
  );
}
