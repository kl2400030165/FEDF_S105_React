// src/App.jsx
import { useEffect, useState } from "react";

function App() 
{
  // List display (optional but useful)
  const [students, setStudents] = useState([]);

  // Find-by-ID panel
  const [searchId, setSearchId] = useState("");
  const [found, setFound] = useState(null);

  // Update panel (name for the found record)
  const [editName, setEditName] = useState("");

  // Create panel (optional quick add)
  const [newName, setNewName] = useState("");

  // UX
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // Absolute URL to avoid relying on a proxy in dev
  const API_BASE = "http://localhost:5000/api/students";

  // ---- Helpers ----
  const clearAlerts = () => {
    setError("");
    setMsg("");
  };

  const refreshList = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Server returned " + res.status);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("refreshList error:", err);
      setError("Could not load students");
    }
  };

  useEffect(() => {
    refreshList();
  }, []);

  // ---- Find by ID ----
  const findById = async () => {
    clearAlerts();
    const idNum = Number(searchId);
    if (!idNum) {
      setFound(null);
      setError("Enter a numeric id");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/${idNum}`);
      if (res.status === 404) {
        setFound(null);
        setError("Student not found");
        return;
      }
      if (!res.ok) throw new Error("Server returned " + res.status);

      const data = await res.json();
      setFound(data);
      setEditName(data.name); // prefill for update
      setMsg("Student loaded. You can update or delete now.");
    } catch (err) {
      console.error("findById error:", err);
      setFound(null);
      setError("Could not fetch student");
    }
  };

  // ---- Update (PUT) based on found id ----
  const updateFound = async () => {
    clearAlerts();
    if (!found) {
      setError("Find a student first");
      return;
    }
    if (!editName.trim()) {
      setError("Name is required");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/${found.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });
      if (res.status === 404) {
        setError("Student not found (maybe deleted already)");
        return;
      }
      if (!res.ok) throw new Error("Server returned " + res.status);

      const updated = await res.json();
      setFound(updated);
      setMsg("Student updated successfully.");
      // reflect in list
      setStudents(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    } catch (err) {
      console.error("updateFound error:", err);
      setError("Could not update student");
    }
  };

  // ---- Delete (DELETE) based on found id ----
  const deleteFound = async () => {
    clearAlerts();
    if (!found) {
      setError("Find a student first");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/${found.id}`, { method: "DELETE" });
      if (res.status === 404) {
        setError("Student not found (maybe deleted already)");
        return;
      }
      if (!res.ok) throw new Error("Server returned " + res.status);

      setMsg(`Student #${found.id} deleted.`);
      // remove from list
      setStudents(prev => prev.filter(s => s.id !== found.id));
      // clear the found panel
      setFound(null);
      setEditName("");
      setSearchId("");
    } catch (err) {
      console.error("deleteFound error:", err);
      setError("Could not delete student");
    }
  };

  // ---- (Optional) quick create to test flow ----
  const addStudent = async () => {
    clearAlerts();
    if (!newName.trim()) return;
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if(!res.ok) throw new Error("Server returned " + res.status);
      const data = await res.json();
      setStudents(prev => [...prev, data]);
      setNewName("");
      setMsg(`Created ${data.id} (${data.name}). Use Find to edit/delete.`);
    } catch (err) {
      console.error("addStudent error:", err);
      setError("Could not add student");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 640 }}>
      <h1>Students (Find → Update / Delete by ID)</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {msg && <p style={{ color: "green" }}>{msg}</p>}

      {/* List (for context) */}
      <div style={{ marginBottom: 16 }}>
        <button onClick={refreshList}>Refresh List</button>
        <ul>
          {students.map(s => (
            <li key={s.id}>{s.id} — {s.name}</li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Quick create (optional) */}
      <div style={{ margin: "12px 0" }}>
        <h3>Add New Student</h3>
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={addStudent} disabled={!newName.trim()}>
          Add
        </button>
      </div>

      <hr />

      {/* Find → Update / Delete */}
      <div style={{ marginTop: 12 }}>
        <h3>Find by ID</h3>
        <input
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          placeholder="Enter numeric id"
          style={{ width: 160, marginRight: 8 }}
        />
        <button onClick={findById}>Find</button>

        {found && (
          <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd" }}>
            <div><strong>Found:</strong> {found.id} — {found.name}</div>

            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Edit name"
              />
              <button onClick={updateFound}>Update</button>
              <button onClick={deleteFound}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;