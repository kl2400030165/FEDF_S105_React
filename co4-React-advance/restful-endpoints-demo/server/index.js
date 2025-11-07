// server.js
// Import required modules
const express = require("express");
const cors = require("cors");

// Create Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());            // Allow cross-origin (handy in dev)
app.use(express.json());    // Parse JSON request bodies

// In-memory "database"
let students = [
  { id: 1, name: "Venki" },
  { id: 2, name: "Jaswanth" },
  { id: 3, name: "Lalli" },
];
let nextId = Math.max(0, ...students.map(s => s.id)) + 1;

// ---- RESTful Endpoints ----

// GET /api/students -> list all students
app.get("/api/students", (req, res) => {
  res.json(students); // 200 OK with array
});

// GET /api/students/:id -> get one by id
app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id (must be a number)" });
  }
  const found = students.find(s => s.id === id);
  if (!found) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(found); // 200 OK
});

// POST /api/students -> create
app.post("/api/students", (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newStudent = { id: nextId++, name: name.trim() };
  students.push(newStudent);
  res.status(201).json(newStudent); // 201 Created
});

// PUT /api/students/:id -> update name by id
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id (must be a number)" });
  }

  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students[idx] = { ...students[idx], name: name.trim() };
  return res.json(students[idx]); // 200 OK with updated object
});

// DELETE /api/students/:id -> delete by id
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id (must be a number)" });
  }
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(idx, 1);
  return res.status(204).end(); // 204 No Content
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});