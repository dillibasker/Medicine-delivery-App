const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Store order in database
router.post("/orders", async (req, res) => {
  try {
    const { medicines, totalCost, paymentMethod } = req.body;

    const newOrder = new Order({
      medicines,
      totalCost,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("medicines.medicineId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports =router;
