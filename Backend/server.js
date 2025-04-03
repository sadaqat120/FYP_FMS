require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const farmRoutes = require("./routes/farmForm.routes");
const recordRoutes = require('./routes/record.routes');
const cropRecordRoutes = require('./routes/cropRecord.routes');
const costTrackingRoutes = require('./routes/costTracking.routes');
const resultSummaryRoutes = require('./routes/resultSummary.routes');
const dashboard = require('./routes/dashboard.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/farmDB";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Updated to match your Vite frontend port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Explicitly allow headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
// Add this line after other route declarations
app.use("/api/farms", farmRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/crop-records', cropRecordRoutes);
app.use('/api/cost-tracking', costTrackingRoutes);
// Update your route registration with debugging
app.use('/api/result-summaries', (req, res, next) => {
  console.log('Request received at /api/result-summaries');
  next();
}, resultSummaryRoutes);
app.use('/api/dashboard', dashboard);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));