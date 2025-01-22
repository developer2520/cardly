import React, { useState, useEffect } from 'react';
import './cardDetails.css';
import PhoneView from './phoneView';
import TopBar from './topbar/topbar';
import { IoArrowBackOutline } from "react-icons/io5";

export default function CardDetails({ card, setSelectedCard }) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the visibility when the card is selected
  useEffect(() => {
    if (card) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [card]);

  document.title = `${card ? card.title : 'Cardly'} | Cardly`;

  return (
    <>
      <div className="detailsContainer">
      <div className="back-to-cardlist">
        <button onClick={() => setSelectedCard(null)}><IoArrowBackOutline /></button>
        <h1>{card.title}</h1>
      </div>
        <div className={`cardDetails ${isVisible ? 'show' : ''}`}>
          <TopBar card={card} setSelectedCard={setSelectedCard} />
          {/* Add content here */}
        </div>

        <PhoneView card={card} />
      </div>
    </>
  );
}
