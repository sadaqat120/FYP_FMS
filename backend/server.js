const express = require('express');
const cors = require('cors'); // Import CORS middleware
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./Routes/authRoutes'); // Import authentication routes

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use authentication routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));