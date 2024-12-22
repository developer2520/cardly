// src/components/Sidebar.jsx
import React from 'react';
import './sidebar.css'
import { NavLink } from 'react-router-dom'; // Use NavLink to manage active states

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Taplink</h2>
      <NavLink to="/dashboard" className="sidebar-link">Dashboard</NavLink>
      <NavLink to="/account" className="sidebar-link account">Profile</NavLink>
      <NavLink to="/settings" className="sidebar-link">Settings</NavLink>
      <NavLink to="/analytics" className="sidebar-link">Analytics</NavLink>
      <NavLink to="/templates" className="sidebar-link">Templates</NavLink>
    </div>
  );
};

export default Sidebar;
