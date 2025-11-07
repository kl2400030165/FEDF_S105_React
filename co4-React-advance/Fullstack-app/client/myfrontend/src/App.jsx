import React, { useEffect, useState } from "react";
import axios from "axios";

function App() 
{
  const [message, setMessage] = useState("");

  // Fetch data from backend
  useEffect(() => {
  axios.get("http://localhost:3000")
    .then((response) => {
      setMessage(response.data.message); //  read JSON property
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + Node.js Example</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;