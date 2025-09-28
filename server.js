require("dotenv").config(); // Load .env variables first

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
const Login1Router = require("./routes/api/Login1");
const Login2Router = require("./routes/api/Login2");
const Login3Router = require("./routes/api/Login3");
const APPBOOKING = require("./routes/api/AppBooking");
const PATIENTCHECKIN = require("./routes/api/PatientCheckin");
const PharmacyRouter = require("./routes/api/Pharmacy");

const app = express();

// =======================
// Middleware Configuration
// =======================
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ✅ Updated CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:3000",        // Allow your frontend (React)
    "https://your-production.com"   // Optional: Allow production domain
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
}));

// ==============
// Database Setup
// ==============
mongoose.set('strictQuery', false); // Suppress Mongoose deprecation warning

const db = process.env.MONGO_URI || "mongodb://localhost:27017/defaultdb";

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: "majority"
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit if DB connection fails
});

// Handle MongoDB connection events
mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));
mongoose.connection.on("disconnected", () => console.log("MongoDB disconnected"));

// ================
// Passport Setup
// ================
app.use(passport.initialize());
require("./middleware/passport")(passport);

// ===========
// Routes
// ===========
app.get("/", (req, res) => {
  res.status(200).json({
    status: "running",
    message: "Server is operational",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/Login1", Login1Router);
app.use("/api/Login2", Login2Router);
app.use("/api/Login3", Login3Router);
app.use("/api/appbooking", APPBOOKING);
app.use("/api/PatientCheckin", PATIENTCHECKIN);
app.use("/api/Pharmacy", PharmacyRouter);

// ===========
// Error Handling
// ===========
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ===========
// Server Start
// ===========
const port = process.env.PORT || 5001;
const host = process.env.HOST || "0.0.0.0"; // Listen on all network interfaces

app.listen(port, host, () => {
  console.log(`=================================`);
  console.log(`Server running on http://${host}:${port}`);
  console.log(`Accessible on your network via:`);
  console.log(`http://${getLocalIpAddress()}:${port}`);
  console.log(`=================================`);
});

// Helper function to get local IP
function getLocalIpAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
}
