import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend Socket.io server

const MapComponent = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Listen for location updates
    socket.on("locationUpdate", (data) => {
      console.log("New location received:", data);
      setLocation({ lat: data.lat, lng: data.lng });
    });

    return () => {
      socket.off("locationUpdate"); // Clean up when component unmounts
    };
  }, []);

  return (
    <div>
      <h2>Delivery Boy's Live Location</h2>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
};

export default MapComponent;
