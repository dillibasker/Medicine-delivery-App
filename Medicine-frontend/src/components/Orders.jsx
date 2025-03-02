import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/order");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders placed yet.</p> : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Cost:</strong> ₹{order.totalCost}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Ordered Medicines:</strong></p>
            <ul>
              {order.medicines.map((med, index) => (
                <li key={index}>{med.name} - {med.quantity} pcs</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
