import React, { useState } from "react";
import "./Login.css";
import { api, setToken } from "../api/client";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let resp;
      if (isNewUser) {
        resp = await api.register({ email, password, name, role });
      } else {
        resp = await api.login({ email, password });
      }
      const { token, user } = resp;
      setToken(token);
      // persist user locally for app reloads
      localStorage.setItem("user", JSON.stringify(user));
      if (typeof onLogin === "function") onLogin(user);
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="app-title">🎓ScholarBridge</div>

      <div className="login-card">
        <h2>{isNewUser ? "Register" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          {isNewUser && (
            <label>
              Name
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </label>
          )}

          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>

          <label>
            Select Role
            <select value={role} onChange={e => setRole(e.target.value)} disabled={!isNewUser}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>{loading ? "Please wait..." : (isNewUser ? "Register" : "Login")}</button>
        </form>

        <p>
          {isNewUser ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => { setIsNewUser(!isNewUser); setError(""); }}>
            {isNewUser ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
