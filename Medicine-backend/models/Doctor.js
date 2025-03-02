const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: String,
    Specialization: String,
    Experience: Number,
    Contact: String,
  });
 
 module.exports=mongoose.model("Doctor",doctorSchema)