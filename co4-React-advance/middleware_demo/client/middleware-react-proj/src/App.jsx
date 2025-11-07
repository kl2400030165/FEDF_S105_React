// client/App.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

function App() 
{
  const [message, setMessage] = useState("");     // For GET response
  const [name, setName] = useState("");           // For input value
  const [reply, setReply] = useState("");         // For POST response

  // ===== GET request =====
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  // ===== POST request =====
  const sendData = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/data", {
        name: name,
        time: new Date().toLocaleTimeString(),
      });
      setReply(res.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  // ===== JSX (UI) =====
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1> React + Express Middleware session Example</h1>
      <h2>Backend says: {message}</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={sendData} style={{ padding: "8px 15px" }}>
        Send Data
      </button>

      {reply && <p style={{ color: "green", marginTop: "15px" }}>{reply}</p>}
    </div>
  );
}

export default App;