import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Medicines from "./components/Medicines";
import Orders from "./components/Orders";
import LiveTracking from "./components/LiveTracking";
import DeliveryApp from "./components/DeliveryApp";

function App() {
  const deliveryBoyId = "123"; // You should replace this dynamically

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/orders" element={<Orders />} />
        {/* New Routes for Tracking and Delivery App */}
        <Route path="/tracking" element={<LiveTracking deliveryBoyId={deliveryBoyId} />} />
        <Route path="/delivery" element={<DeliveryApp deliveryBoyId={deliveryBoyId} />} />
      </Routes>
    </>
  );
}

export default App;
