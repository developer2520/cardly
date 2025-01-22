import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './layout.css';
import { CardListProvider } from './../../context/cardListContext'; // Correct import for context provider

const Layout = ({ children, onCreateNewCard }) => {
  return (
    <CardListProvider>
      <div className="layout">
        <Sidebar onCreateNewCard={onCreateNewCard} />
        <div className="content">
          {children}
        </div>
      </div>
    </CardListProvider>
  );
};

export default Layout;
