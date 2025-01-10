import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import CardList from '../../components/cardsList/cardsList';
import CardDetails from '../../components/cardDetails/cardDetails';

import './dashboard.css';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);

  document.title = "Home";

  return (
    <Layout>
      <div className="dashboard">
        {/* Pass the function to select the card */}
        <CardList className="cardList" onCardSelect={setSelectedCard} />

        {/* Conditionally render the CardDetails component */}
        {selectedCard ? (
          <CardDetails className={`cardDetails ${selectedCard ? 'active' : ''}`} card={selectedCard} />
        ) : (
          <div className="noCardDiv">
            <p>Select a card to start editing</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
