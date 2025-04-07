import React from "react";
import { useState, useEffect } from "react";

// Haversine formula to calculate distance between two lat/lng points
// Returns the distance between user and item
const getDistance = (
  lat1: number, //lat of current user
  lon1: number, //lon of current user
  lat2: number, //lat of item
  lon2: number //lon of item
): number => {
  // returns a number which is the Distance
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
    if (navigator.geolocation) {
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

  return <p className="text-gray-400">Fetching location...</p>;
}

// Component to fetch city and image
function CityImageFetcher({ latitude, longitude }: { latitude: number; longitude: number }) {
  const [city, setCity] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const cityName =
          data.address.city || data.address.town || data.address.village || "Unknown City";
        setCity(cityName);
        fetchCityImage(cityName);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };

    const fetchCityImage = async (cityName: string) => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?client_id=GYIGqKl0eg1FmtuJNq0roBiL4s669ydBLcv_SPw2roQ&query=${cityName}`
        );
        const data = await res.json();
        setImageUrl(data.results[0]?.urls.regular || "");
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (latitude && longitude) {
      fetchCity();
    }
  }, [latitude, longitude]);

  return (
    <div className="mt-6">
      {city && <h2 className="text-xl font-semibold">Nearest City: {city}</h2>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`View of ${city}`}
          className="rounded-xl mt-4 max-w-full"
        />
      )}
    </div>
  );
}


const LocationFinder = () => {


  const [coordinates, setCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  //change this to eventually get the coordinates from mongoDB
  const targetCoords = { latitude: 40.758, longitude: -73.9855 };


  /* Fetch for User coordinates */
  //for now i have fake coords
  useEffect(() => {
    setCoordinates({
        latitude: 33.2334,
        longitude: 43.5839
      });
  }, []);


  //Display current Lat - Lon, Display Distance,
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-2xl font-bold mb-2">Location Component</h1>
        {coordinates.latitude && coordinates.longitude ? ( // If we have both coordinates
          <>
            <p className="text-lg">
              🌎 Latitude:{" "}
              <span className="font-semibold">
                {coordinates.latitude.toFixed(5)}
              </span>
            </p>
            <p className="text-lg">
              🌎 Longitude:{" "}
              <span className="font-semibold">
                {coordinates.longitude.toFixed(5)}
              </span>
            </p>
            <p className="text-lg mt-4">📏 Distance to Item:</p>
            <p className="text-3xl font-bold text-blue-400">{13.3} miles</p>
          </>
        ) : (
          //Else display
          <p className="text-gray-400">Fetching location...</p>
        )}
      </div>
    </div>
  );
};

export default LocationFinder;
