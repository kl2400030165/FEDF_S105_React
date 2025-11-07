import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TeacherSidebar from "./components/TeacherSidebar";
import { clearToken } from "./api/client";
import "./App.css";
const Dashboard = lazy(() => import("./components/Dashboard"));
const AddActivity = lazy(() => import("./components/AddActivity"));
const MyActivities = lazy(() => import("./components/MyActivities"));
const Certificates = lazy(() => import("./components/Certificates"));
const Achievements = lazy(() => import("./components/Achievements"));
const Events = lazy(() => import("./components/EventsList"));
const AddGoal = lazy(() => import("./components/AddGoal")); // AddGoal imported
const TeacherCertificates = lazy(() => import("./components/TeacherCertificates"));
const TeacherAchievements = lazy(() => import("./components/TeacherAchievements"));

function ActivityRecords() {
  return (
    <div>
      <h1>Activity Records</h1>
      <AddActivity />
      <MyActivities />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Load user from localStorage on boot
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
        setRole(u?.role || null);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setRole(loggedInUser?.role || null);
  };

  const handleSignOut = () => {
    clearToken();
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <Navbar
        user={user}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        onSignOut={handleSignOut}
        sidebarOpen={sidebarOpen}
      />

      {/* Sidebar switches based on role */}
      {role === "teacher" ? (
        <TeacherSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      ) : (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
          {/* Default route based on role */}
          <Route
            path="/"
            element={
              role === "teacher" ? (
                <Navigate to="/teacher-certificates" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          {/* Teacher-only routes */}
          {role === "teacher" && (
            <>
              <Route path="/teacher-certificates" element={<TeacherCertificates />} />
              <Route path="/teacher-achievements" element={<TeacherAchievements />} />
              <Route
                path="/teacher-dashboard"
                element={<Navigate to="/teacher-certificates" replace />}
              />
            </>
          )}

          {/* Student-only routes */}
          {role !== "teacher" && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/activity-records" element={<ActivityRecords />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/events" element={<Events />} />
              <Route path="/goals" element={<AddGoal />} /> {/* Added AddGoal route */}
            </>
          )}

          {/* Fallback route */}
          <Route
            path="*"
            element={
              role === "teacher" ? (
                <Navigate to="/teacher-certificates" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
