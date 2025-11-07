import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <aside id="app-sidebar" className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <span role="img" aria-label="app">Student Panel</span>
      </div>
      <nav>
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <NavLink to="/dashboard" onClick={onClose} className={({ isActive }) => isActive ? "active" : undefined}>Dashboard</NavLink>
          </li>
          <li className={location.pathname === "/activity-records" ? "active" : ""}>
            <NavLink to="/activity-records" onClick={onClose} className={({ isActive }) => isActive ? "active" : undefined}>Activity Records</NavLink>
          </li>
          <li className={location.pathname === "/achievements" ? "active" : ""}>
            <NavLink to="/achievements" onClick={onClose} className={({ isActive }) => isActive ? "active" : undefined}>Achievements</NavLink>
          </li>
          <li className={location.pathname === "/certificates" ? "active" : ""}>
            <NavLink to="/certificates" onClick={onClose} className={({ isActive }) => isActive ? "active" : undefined}>Certificates</NavLink>
          </li>
          <li className={location.pathname === "/events" ? "active" : ""}>
            <NavLink to="/events" onClick={onClose} className={({ isActive }) => isActive ? "active" : undefined}>Events</NavLink>
          </li>
          <li className={location.pathname === "/goals" ? "active" : ""}>
            <NavLink to="/goals" onClick={onClose} className={({ isActive }) => isActive ? "active" : undefined}>Goals</NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-bottom">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#help">Help</a>
      </div>
    </aside>
  );
};

export default Sidebar;
