const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientName: String,
    doctorId: mongoose.Schema.Types.ObjectId,
    Age:Number,
    gender: String,
    emailId:String,
    contactNumber:String,
    Address:String,
    status: { type: String, default: "Pending" }
  });
module.exports=mongoose.model("Appointment", appointmentSchema);
