import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to your backend URL

const DeliveryApp = ({ deliveryBoyId }) => {
  useEffect(() => {
    const sendLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const data = {
            deliveryBoyId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          socket.emit("updateLocation", data);
        });
      }
    };

    const interval = setInterval(sendLocation, 5000); // Send location every 5 seconds

    return () => clearInterval(interval);
  }, [deliveryBoyId]);

  return <h2>Delivery Boy App - Location is being sent</h2>;
};

export default DeliveryApp;
