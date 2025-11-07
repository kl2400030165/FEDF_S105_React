const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// --- Load .env ---
// If your .env sits NEXT TO server.js (recommended):
dotenv.config();

// If your .env is in the project ROOT instead, comment the line above
// and uncomment this path-based config:
// dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
app.use(cors());
app.use(express.json());

// Health/ping route
app.get("/", (_req, res) => {
  res.send("API is running");
});

// API routes
app.use("/api/users", userRoutes);

// Start only after DB is connected
(async () => {
  try {
    const { MONGO_URI, PORT } = process.env;

    // Extra diagnostic (won't print the secret):
    if (!MONGO_URI) {
      throw new Error(
        "MONGO_URI is undefined. Ensure .env is loaded and in the right location."
      );
    }

    await connectDB(MONGO_URI);

    const port = Number(PORT) || 5000;
    app.listen(port, () => {
      console.log(` Server running on port ${port}`);
    });
  } catch (err) {
    console.error(" Startup error:", err.message);
    process.exit(1);
  }
})();