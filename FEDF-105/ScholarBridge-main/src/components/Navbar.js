import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = ({ user, onMenuClick, onSignOut, sidebarOpen }) => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (!user) return setUserName("User");
    if (user.name) return setUserName(user.name);
    if (user.email) return setUserName(user.email.split("@")[0]);
    setUserName("User");
  }, [user]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <span role="img" aria-label="app">🎓 ScholarBridge</span>
        </div>
        <button
          className="navbar-menu"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          aria-expanded={!!sidebarOpen}
          aria-controls="app-sidebar"
        >
          {/* menu icon could go here */}
        </button>
      </div>
      <div className="navbar-right">
        <div className="navbar-profile-wrap">
          <button className="navbar-profile" aria-label="User profile">
            <span className="navbar-avatar-dot"></span>
            <span className="navbar-profile-label">{userName}</span>
          </button>
          <button className="navbar-signout-btn" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
