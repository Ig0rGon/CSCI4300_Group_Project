import React from "react";
import { useState } from "react";

const LocationFinder = () => {
  const [coordinates, setCoordinates] = useState({ 
    latitude: -20.75263, 
    longitude: -36.59177 
  });

  return(
    <>
        <div>
            <h1>Location Component</h1>
            <ul>
                <li>Latitude: {coordinates.latitude}</li>
                <li>Longitude: {coordinates.longitude}</li>
            </ul>
        </div>
    </>
    );
};


export default LocationFinder