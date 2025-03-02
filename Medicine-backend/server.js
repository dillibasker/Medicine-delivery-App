const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Change this to frontend URL in production
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log("MongoDB is not Connected", err));

  // Schema for Delivery Boy Location
const LocationSchema = new mongoose.Schema({
  deliveryBoyId: String,
  latitude: Number,
  longitude: Number,
  updatedAt: { type: Date, default: Date.now },
});
const Location = mongoose.model("Location", LocationSchema);

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("updateLocation", async (data) => {
    console.log("Location received:", data);

    const { deliveryBoyId, latitude, longitude } = data;

    await Location.findOneAndUpdate(
      { deliveryBoyId },
      { latitude, longitude, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    io.emit("locationUpdate", data); // Send updated location to all users
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// API to get delivery boy's latest location
app.get("/api/location/:deliveryBoyId", async (req, res) => {
  const { deliveryBoyId } = req.params;
  const location = await Location.findOne({ deliveryBoyId });
  if (location) {
    res.json(location);
  } else {
    res.status(404).json({ message: "Location not found" });
  }
});

// Use your routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/medicines", require("./routes/medicineRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/appointments", require("./routes/appointment"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
