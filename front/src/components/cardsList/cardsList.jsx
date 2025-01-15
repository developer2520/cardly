import React, { useContext } from 'react';
import './cardsList.css';
import { OwnCardsContext } from '../../context/ownCardsContext';

export default function CardList({ onCardSelect, onCreateNewCard, selectedCard }) {
  const { ownCards, loading } = useContext(OwnCardsContext);

  if (loading) {
    return (
      <div className="cardlist loaderContainer">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="cardlist">
      <div className="buttonContainer">
        {/* Button to create a new card */}
        <button onClick={onCreateNewCard} className="button-58">
          +
        </button>
      </div>

      {/* Render list of cards */}
      {ownCards.map((card) => (
        <div
          key={card._id}
          className={`card ${selectedCard && selectedCard._id === card._id ? 'active' : ''}`}
          onClick={() => onCardSelect(card)}
        >
          <h3>{card.title}</h3>
          <p>@{card.url}</p>
          <a href={card.link} target="_blank" rel="noopener noreferrer">
            {card.link}
          </a>
        </div>
      ))}
    </div>
  );
}
