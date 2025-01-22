import React, { useState, useEffect } from 'react';
import TopBar from './topbar/topbar';
import './newcard.css';
import PhoneView from './phoneView/phoneView';
import { IoArrowBackOutline } from "react-icons/io5";

export default function NewCard({ setSelectedCard, setIsCreatingNewCard }) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger visibility when the component mounts
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // Cleanup when unmounting
  }, []);

  document.title = 'Create New Card | Cardly';

  const handleBack = () => {
    setSelectedCard(null);
    setIsCreatingNewCard(false); // Reset isCreatingNewCard
  };

  return (
    <>
      <div className="newCardContainer">
        <div className="back-to-cardlist">
          <button onClick={handleBack}><IoArrowBackOutline /></button>
          <h1>Creating new card</h1>
        </div>
        <div className={`newCard ${isVisible ? 'show' : ''}`}>
          <TopBar setSelectedCard={setSelectedCard} />
          {/* Add other new card content here */}
        </div>

        <PhoneView />
      </div>
    </>
  );
}
