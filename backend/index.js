const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Routes for testing
app.get('/', (req, res) => {
  res.send('This is the homepage for backend');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});


// Export the app for Vercel
module.exports = app;
