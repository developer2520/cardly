import React, { useState, useEffect } from 'react';
import './cardDetails.css';
import PhoneView from './phoneView';
import TopBar from './topbar/topbar';
import { IoArrowBackOutline, IoPhonePortraitOutline, IoCloseOutline } from "react-icons/io5";

export default function CardDetails({ card, setSelectedCard }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [isPhoneViewOpen, setIsPhoneViewOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (card) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [card]);

  document.title = `${card ? card.title : 'Cardly'} | Cardly`;

  const togglePhoneView = () => {
    setIsPhoneViewOpen(!isPhoneViewOpen);
  };

  return (
    <div className="detailsContainer">
      <div className="back-to-cardlist">
        <button onClick={() => setSelectedCard(null)}><IoArrowBackOutline /></button>
        <h1>{card.title}</h1>
        
        {isMobile && (
          <button 
            className={`phone-view-toggle ${isPhoneViewOpen ? 'active' : ''}`} 
            onClick={togglePhoneView}
          >
           Preview
          </button>
        )}
      </div>

      <div className={`cardDetails ${isVisible ? 'show' : ''}`}>
        <TopBar card={card} setSelectedCard={setSelectedCard} />
        {/* Add content here */}
      </div>

      {/* Phone view rendering logic */}
      {!isMobile ? (
        <PhoneView card={card} />
      ) : isPhoneViewOpen ? (
        <div className="mobile-phone-view-container">
          <button 
            className="close-phone-view" 
            onClick={togglePhoneView}
          >
            <IoCloseOutline />
          </button>
          <PhoneView card={card} onClose={togglePhoneView} />
        </div>
      ) : null}
    </div>
  );
}
