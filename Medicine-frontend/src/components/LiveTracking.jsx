import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./LiveTracking.css"; // Importing updated CSS

const socket = io("http://localhost:5000"); // Change to your backend URL

const LiveTracking = ({ deliveryBoyId }) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    // Fetch initial location from DB
    fetch(`http://localhost:5000/api/location/${deliveryBoyId}`)
      .then((res) => res.json())
      .then((data) => setLocation(data))
      .catch((err) => console.error(err));

    // Listen for real-time updates
    socket.on("locationUpdate", (data) => {
      if (data.deliveryBoyId === deliveryBoyId) {
        setLocation({ latitude: data.latitude, longitude: data.longitude });
      }
    });

    return () => {
      socket.off("locationUpdate");
    };
  }, [deliveryBoyId]);

  return (
    <div className="tracking-container">
      <h2>Live Delivery Tracking</h2>
      <div className="map-container">
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>Delivery Boy Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveTracking;
