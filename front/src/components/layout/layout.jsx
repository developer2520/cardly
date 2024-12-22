// src/components/Layout.jsx
import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Sidebar will be visible on pages that use this layout */}
      <Sidebar />
      
      {/* Page Content */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
