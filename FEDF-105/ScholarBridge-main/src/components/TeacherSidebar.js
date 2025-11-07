// src/components/TeacherSidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // or your custom teacher CSS

export default function TeacherSidebar({ open, onClose }) {
  return (
    <aside className={`sidebar teacher-sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Teacher Panel</h2>
      </div>

      <nav className="sidebar-links">
        <ul>
          <li>
            <NavLink to="/teacher-certificates" onClick={onClose} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              Student Certificates
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacher-achievements" onClick={onClose} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
              Student Achievements
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
