const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
    name: String,
    price: Number,  // ✅ Correct field name
    stock: Number,
    pharmacy: String,
    imageUrl: String, 
});

module.exports = mongoose.model("Medicine", MedicineSchema);
