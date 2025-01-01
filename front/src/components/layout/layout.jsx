// src/components/Layout.jsx
import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div className="layout">
    
      <Sidebar />
      
      
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
