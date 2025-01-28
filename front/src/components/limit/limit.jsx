import React from 'react';
import './limit.css';

export default function Limit({ onClose }) {
  return (
    <>
      <div className="limit-page-overlay" onClick={onClose}></div> {/* Overlay click closes the message */}
      <div className="limitPage">
        <p className="limit-message">Oops! You've reached the maximum of 5 pages.</p>
        <button className="limit-button" onClick={onClose}>Got it!</button>
      </div>
    </>
  );
}
