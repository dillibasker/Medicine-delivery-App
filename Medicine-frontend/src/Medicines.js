import { useEffect, useState } from "react";
import { fetchMedicines, placeOrder } from "../api";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines().then(res => setMedicines(res.data));
  }, []);

  const handleOrder = (medicineId) => {
    placeOrder({ userId: "123", medicineId, quantity: 1 }).then(() => alert("Order Placed!"));
  };

  return (
    <div>
      {medicines.map(med => (
        <div key={med._id}>
          <h3>{med.name} - ₹{med.price}</h3>
          <button onClick={() => handleOrder(med._id)}>Order Now</button>
        </div>
      ))}
    </div>
  );
};

export default Medicines;
