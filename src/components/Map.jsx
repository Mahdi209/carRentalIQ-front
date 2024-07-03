import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import locationPng from "../assets/location-pin.png";

function Map({ location }) {
  const defaultLocation = { lat: 51.505, lng: -0.09 }; // Default to London if location is not provided

  const [position, setPosition] = useState(() => {
    if (location && location.length > 0) {
      return { lat: location[0].latitude, lng: location[0].longitude };
    } else {
      return defaultLocation;
    }
  });

  console.log(location);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (geoPosition) => {
          // const { latitude, longitude } = geoPosition.coords;
          // setPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const customIcon = new L.Icon({
    iconUrl: locationPng,
    iconSize: [36, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [60, 38],
  });

  return (
    <div className="flex flex-col">
      <MapContainer center={position} zoom={13} style={{ height: "600px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>Your Current Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
