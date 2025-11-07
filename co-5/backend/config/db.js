const mongoose = require("mongoose");

async function connectDB(uri) {
  if (!uri || typeof uri !== "string" || !uri.trim()) {
    throw new Error(
      "MONGO_URI is missing. Set it in your .env file, e.g. MONGO_URI=mongodb://127.0.0.1:27017/c05db"
    );
  }

  // Optional: make Mongoose warnings quieter/stricter
  mongoose.set("strictQuery", true);

  const conn = await mongoose.connect(uri, {
    // options not strictly required in Mongoose 7/8, but fine to keep
  });

  console.log(` MongoDB Connected: ${conn.connection.host}`);
  return conn;
}

module.exports = { connectDB };