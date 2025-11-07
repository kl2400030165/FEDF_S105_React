// pages/dashboard.js
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.text));
  }, []);

  return (
    <main style={{ padding: 20 }}> 
      <h1>Dashboard Page </h1>
      <p>Message from backend: {message}</p>
      <Link href="/">Back to Home</Link>
    </main>
  );
}