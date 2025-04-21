import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

interface MapProps {
  sellerLocation: [number, number]; // [longitude, latitude]
  buyerLocation: [number, number]; // [longitude, latitude]
}

const MapWithDirections: React.FC<MapProps> = ({ sellerLocation, buyerLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    if (mapContainerRef.current) {
      // Initialize the map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: sellerLocation,
        zoom: 12,
      });

      // Add navigation controls
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add directions control
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        controls: {
          instructions: true,
        },
      });

      mapRef.current.addControl(directions, "top-left");

      // Set the buyer's location as the origin and the seller's location as the destination
      directions.setOrigin(buyerLocation);
      directions.setDestination(sellerLocation);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [sellerLocation, buyerLocation]);

  return <div ref={mapContainerRef} style={{ height: "500px", width: "100%" }} />;
};

export default MapWithDirections;