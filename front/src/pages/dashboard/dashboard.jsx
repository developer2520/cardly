import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import CardList from '../../components/cardsList/cardsList';
import CardDetails from '../../components/cardDetails/cardDetails';
import NewCard from '../../pages/newcard/newcard'; // Import NewCard component

import './dashboard.css';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check initial screen size
  const [isCreatingNewCard, setIsCreatingNewCard] = useState(false);

  document.title = "Home";

  // Update `isMobile` on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateNewCard = () => {
    setSelectedCard(null); // Deselect any card
    setIsCreatingNewCard(true); // Show the NewCard component
  };

  return (
    <Layout>
      <div className={`dashboard ${isMobile ? 'mobile' : 'desktop'}`}>
        {/* Chat list */}
        {!selectedCard || !isMobile ? (
          <CardList
            className="cardList"
            onCardSelect={(card) => {
              setSelectedCard(card);
              setIsCreatingNewCard(false);
            }}
            onCreateNewCard={handleCreateNewCard}
          />
        ) : null}

        {/* Chat details or New Card */}
        {isCreatingNewCard ? (
          <NewCard setSelectedCard={setSelectedCard} />
        ) : selectedCard ? (
          <CardDetails
            className={`cardDetails ${selectedCard ? 'active' : ''}`}
            card={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ) : (
          <div className="noCardDiv">
            <p>Select a card to start editing</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
