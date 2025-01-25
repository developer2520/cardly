import React, { useState, useEffect } from 'react';
import './newcard.css';
import PhoneView from './phoneView/phoneView';
import TopBar from './topbar/topbar';
import { IoArrowBackOutline, IoPhonePortraitOutline, IoCloseOutline } from "react-icons/io5";

export default function NewCard({ setSelectedCard, setIsCreatingNewCard }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isPhoneViewOpen, setIsPhoneViewOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  document.title = 'Create New Card | Cardly';

  const togglePhoneView = () => {
    setIsPhoneViewOpen(!isPhoneViewOpen);
  };

  const handleBack = () => {
    setSelectedCard(null);
    setIsCreatingNewCard(false);
  };

  return (
    <div className="detailsContainer">
      <div className="back-to-cardlist">
        <button onClick={handleBack}><IoArrowBackOutline className='iconn' /></button>
        <h1>New Card</h1>

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
        <TopBar setSelectedCard={setSelectedCard} />
        {/* Add content specific to creating a new card */}
      </div>

      {/* Phone view rendering logic */}
      {!isMobile ? (
        <PhoneView />
      ) : isPhoneViewOpen ? (
        <div className="mobile-phone-view-container">
          <button 
            className="close-phone-view" 
            onClick={togglePhoneView}
          >
            <IoCloseOutline />
          </button>
          <PhoneView onClose={togglePhoneView} />
        </div>
      ) : null}
    </div>
  );
}
