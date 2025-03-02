const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment"); // Ensure this path is correct

// Request an appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    
    res.json({ message: "Appointment requested", appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept an appointment
router.put("/:id/accept", async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: "Accepted" });
    res.json({ message: "Appointment accepted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
