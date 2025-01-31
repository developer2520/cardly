import React, { useContext } from 'react';
import './cardsList.css';
import { OwnCardsContext } from '../../context/ownCardsContext';

export default function CardList({ onCardSelect, onCreateNewCard, selectedCard }) {
  const { ownCards, loading } = useContext(OwnCardsContext);

  if (loading) {
    return (
      <div className="cardlist">
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cardlist">
      {ownCards.length === 0 ? (
        <div className="noCardsMessage">
        <blockquote>"Every great idea starts with a blank page."</blockquote>
        <button onClick={onCreateNewCard} className="createCardButton">
          Create New Card
        </button>
      </div>
      
     
      ) : (
        ownCards.map((card) => (
          <div
            key={card._id}
            className={`card ${selectedCard && selectedCard._id === card._id ? 'active' : ''}`}
            onClick={() => onCardSelect(card)} // Pass selected card on click
          >
            <h3>{card.title}</h3>
            <p>@{card.url}</p>
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              {card.link}
            </a>
          </div>
        ))
      )}
    </div>
  );
}
