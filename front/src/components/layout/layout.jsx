import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './layout.css';
import { CardListProvider } from './../../context/cardListContext'; // Correct import for context provider

const Layout = ({ children }) => {
  return (
    <CardListProvider>
      <div className="layout">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </CardListProvider>
  );
};

export default Layout;
