import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import CardList from '../../components/cardsList/cardsList';
import CardDetails from '../../components/cardDetails/cardDetails';
import NewCard from '../../pages/newcard/newcard';

import './dashboard.css';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCreatingNewCard, setIsCreatingNewCard] = useState(false);
  const location = useLocation();

  document.title = 'Home';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.createNewCard) {
      setSelectedCard(null);
      setIsCreatingNewCard(true);
    }
  }, [location.state]);

  const handleCreateNewCard = () => {
    setSelectedCard(null);
    setIsCreatingNewCard(true);
  };

  return (
    <Layout handleCreateNewCard={handleCreateNewCard}>
      <div className={`dashboard ${isMobile ? 'mobile' : 'desktop'}`}>
        {(!selectedCard && !isCreatingNewCard) || !isMobile ? (
          <CardList
            className="cardList"
            onCardSelect={(card) => {
              setSelectedCard(card);
              setIsCreatingNewCard(false);
            }}
            onCreateNewCard={handleCreateNewCard}
            selectedCard={selectedCard}
          />
        ) : null}

        {isCreatingNewCard && !selectedCard ? (
          <NewCard
            className={`newCard ${isCreatingNewCard ? 'active' : ''}`}
            setSelectedCard={setSelectedCard}
            setIsCreatingNewCard={setIsCreatingNewCard}
          />
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
