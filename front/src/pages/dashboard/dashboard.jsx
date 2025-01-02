import React, { useState } from 'react';
import Layout from '../../components/layout/layout';
import CardList from '../../components/cardsList/cardsList';
import CardDetails from '../../components/cardDetails/cardDetails';

import './dashboard.css';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
  
    <Layout>
      <div className="dashboard">
        <CardList onCardSelect={setSelectedCard} />
        
        {/* Conditionally render the CardDetails component */}
        {selectedCard ? (
          <CardDetails className="detailsCard" card={selectedCard} />
        ) : (
          <div className="noCardDiv">
            <p>Select a card to start editing</p>
          </div>
        )}
      </div>
    </Layout>
 
  );
}
