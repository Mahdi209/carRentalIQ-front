import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import locationPng from "../assets/location-pin.png";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/API/auth";

function MapWithMarker() {
  const dispatch = useDispatch();
  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.auth.user
  );

  const [position, setPosition] = useState({
    lat: 32.06573765184372,
    lng: 44.33712959289551,
  });

  const markerRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          setPosition({ lat: coords.latitude, lng: coords.longitude }),
        (error) => console.error("Error getting position:", error)
      );
    }
  }, []);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const { lat, lng } = marker.getLatLng();
        setPosition({ lat, lng });
      }
    },
  };

  const handleLocation = () => {
    const location = {
      latitude: position.lat,
      longitude: position.lng,
    };
    dispatch(setLocation(location));
    console.log(location);
  };

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
        <Marker
          draggable
          eventHandlers={eventHandlers}
          position={position}
          icon={customIcon}
          ref={markerRef}
        >
          <Popup>موقعك الحالي</Popup>
        </Marker>
        <ZoomToLocation position={position} />
      </MapContainer>
      <button
        onClick={handleLocation}
        className="bg-secondary text-black w-56 rounded-lg font-bold mt-10 h-10 text-xl self-center"
      >
        Set your Location
      </button>
    </div>
  );
}

function ZoomToLocation({ position }) {
  const map = useMap();

  const handleZoom = () => {
    map.setView(position, 13);
  };

  return (
    <button
      onClick={handleZoom}
      className="bg-primary text-white w-56 rounded-lg font-bold mt-10 h-10 text-xl self-center"
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      Zoom to My Location
    </button>
  );
}

export default MapWithMarker;
