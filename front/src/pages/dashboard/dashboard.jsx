import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import CardList from '../../components/cardsList/cardsList';
import CardDetails from '../../components/cardDetails/cardDetails';
import NewCard from '../../pages/newcard/newcard'; // Import NewCard component

import './dashboard.css';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCreatingNewCard, setIsCreatingNewCard] = useState(false); // State for NewCard component

  document.title = "Home";

  const handleCreateNewCard = () => {
    setSelectedCard(null); // Deselect any card
    setIsCreatingNewCard(true); // Show the NewCard component
  };

  return (
    <Layout>
      <div className="dashboard">
        <CardList
          className="cardList"
          onCardSelect={(card) => {
            setSelectedCard(card); // Set the selected card
            setIsCreatingNewCard(false); // Hide the NewCard component
          }}
          onCreateNewCard={handleCreateNewCard} // Pass function to handle creating new card
        />

        {/* Conditionally render CardDetails or NewCard */}
        {isCreatingNewCard ? (
          <NewCard setSelectedCard={setSelectedCard} /> // Show NewCard component
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
