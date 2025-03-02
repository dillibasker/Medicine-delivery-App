const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  medicines: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalCost: Number,
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Orders", OrdersSchema);
