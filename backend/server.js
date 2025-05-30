const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/auth", require("./routes/auth"));
app.use("/profilePictureUpload", require("./routes/profilePictureUpload"));
app.use("/farms", require("./routes/farmRoutes")); // Add this line
app.use("/animals", require("./routes/animalRoutes")); // Animal routes
app.use("/expenses", require("./routes/expenseRoutes")); // Expense routes
app.use("/productions", require("./routes/productionRoutes")); // Production routes
app.use("/stores", require("./routes/storeRoutes")); // New store routes
app.use("/human-resources", require("./routes/humanResourceRoutes")); // New human resource routes
app.use("/unit-resources", require("./routes/unitResourceRoutes")); // Unit resource routes
app.use("/item-resources", require("./routes/itemResourceRoutes")); // Item resource routes
app.use("/resource-dashboard", require("./routes/resource_dashboard")); // Include the new router
app.use("/reminders", require("./routes/reminderRoutes"));

// Chatbot 
app.use("/api/chat", require("./routes/chatRoutes"));

// Crop Management
app.use("/CropFarm", require("./routes/cropFarmRoutes")); // New CropFarm routes
app.use("/land-records", require("./routes/landRecordRoutes"));
app.use("/crop-records", require("./routes/cropRecordRoutes"));
app.use("/cost-tracking", require("./routes/costTrackingRoutes"));
app.use("/result-summary", require("./routes/resultSummaryRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

app.use("/CropFarm", require("./routes/cropFarmRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
