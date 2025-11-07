// Import libraries
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");

// Create express app
const app = express();

// ======== MIDDLEWARES ========

//  Built-in middleware – helps Express read JSON body
app.use(express.json());

//  Third-party middleware – allows React (frontend) to talk with Express (backend)
app.use(cors());

//  Custom middleware – logs every request in console
app.use(logger);

// ======== ROUTES ========

// Simple GET route (for testing)
app.get("/", (req, res) => {
  res.json({ message: " Hello Backend says middlewares demo" });
});

// Simple POST route (to receive data from React)
app.post("/api/data", (req, res) => {
  const userData = req.body;
  res.json({
    received: userData,
    status: " Data received successfully",
  });
});

// ======== START SERVER ========
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});