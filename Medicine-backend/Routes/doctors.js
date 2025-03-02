const express = require("express");
const Doctor = require("../models/Doctor"); // Assuming you have a Doctor model
const router = express.Router();

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
