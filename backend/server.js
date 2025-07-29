require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{

  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/resume', resumeRoutes);

// Optional: Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Optional: Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);
  res.status(500).json({ error: 'Something went wrong.' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
