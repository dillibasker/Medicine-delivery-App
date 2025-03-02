const express = require("express");
const Medicine = require("../models/Medicine");

const router = express.Router();

// Add sample medicines
router.post("/add-sample-medicines", async (req, res) => {
  try {
    const sampleMedicines = [
      {
        name: "Paracetamol",
        price: 10,
        stock: 50,
        pharmacy: "PharmaOne",
        imageUrl: "https://www.alamy.com/500mg-paracetamol-tablet-image.jpg"
      },
      {
        name: "Aspirin",
        price: 15,
        stock: 30,
        pharmacy: "HealthPlus",
        imageUrl: "https://via.placeholder.com/150"
      }
    ];

    await Medicine.insertMany(sampleMedicines);
    res.json({ message: "Sample medicines added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add sample medicines" });
  }
});

// Get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

module.exports = router;
