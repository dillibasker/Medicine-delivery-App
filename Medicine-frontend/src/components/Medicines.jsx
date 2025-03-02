import { useEffect, useState } from "react";
import { fetchMedicines } from "../api";
import "./Medicine.css"; // Import CSS file

function Medicine() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const response = await fetchMedicines();
        setMedicines(response.data);
      } catch (error) {
        setError("Failed to load medicines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadMedicines();
  }, []);

  const handleQuantityChange = (id, price, value) => {
    const newQuantities = { ...quantities, [id]: parseInt(value) || 0 };
    setQuantities(newQuantities);
    
    const newTotal = Object.keys(newQuantities).reduce((sum, key) => {
      const quantity = newQuantities[key];
      const med = medicines.find((m) => m._id === key);
      return sum + (quantity * (med ? med.price : 0));
    }, 0);
    
    setTotalCost(newTotal);
  };

  const handlePayment = async () => {
    if (totalCost === 0) {
      alert("Please select at least one medicine.");
      return;
    }
  
    const selectedMedicines = Object.keys(quantities)
      .filter((key) => quantities[key] > 0)
      .map((key) => {
        const med = medicines.find((m) => m._id === key);
        return {
          medicineId: med._id,
          name: med.name,
          quantity: quantities[key],
          price: med.price,
        };
      });
  
    const orderData = {
      medicines: selectedMedicines,
      totalCost,
      paymentMethod,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        alert(`Payment of ₹${totalCost} done successfully via ${paymentMethod}!`);
        setQuantities({});
        setTotalCost(0);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      alert("Error placing order.");
    }
  };
  
  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="medicine-container">
      <h2 className="heading">Available Medicines</h2>
      <input
        type="text"
        placeholder="Search medicines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {loading && <p>Loading medicines...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="medicine-list">
        {filteredMedicines.map((med) => (
          <div key={med._id} className="medicine-card">
            <img src={med.imageUrl} alt={med.name} className="medicine-image" />
            <h3>{med.name}</h3>
            <p className="price">₹{med.price}</p>
            <input
              type="number"
              min="0"
              value={quantities[med._id] || ""}
              onChange={(e) => handleQuantityChange(med._id, med.price, e.target.value)}
              className="quantity-input"
            />
          </div>
        ))}
      </div>

      <div className="payment-section">
        <p className="total-cost"><strong>Total Cost:</strong> ₹{totalCost}</p>
        <label>Select Payment Method: </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="payment-dropdown"
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>
        <button
          onClick={handlePayment}
          className="pay-button"
          disabled={totalCost === 0}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Medicine;
