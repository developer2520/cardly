import {React, useContext, useEffect, useState} from 'react'
import './cardsList.css'
import { OwnCardsContext } from '../../context/ownCardsContext'
import { Link } from 'react-router-dom';
import NewCard from '../../pages/newcard/newcard';


export default function cardsList({onCardSelect, selectedCard}) {
  const { ownCards, loading, error } = useContext(OwnCardsContext);
  const [notVisible, setNotVisible] = useState(false)
  const [newcard, setNewcard] = useState(false)

  const toggleNewCard = () => {
    setNewcard(!newcard)
  }


  if (loading) { 
    return (
      /* From Uiverse.io by Fernando-sv */ 
      <div className="cardlist loaderContainer">
 <div className="loader"></div>

      </div>
     
    );


  }
  
  return (
    <div className='cardlist'>
      <div className="buttonContainer">
      {/* <Link className='addNewLink button-58' to="/home/newcard">Create new card</Link> */}
      <button onClick={toggleNewCard}>Create a new card</button>

      </div>
     
      {ownCards.map((card) => (
        <div key={card._id} className={`card ${selectedCard ? "active" : ""}`}  onClick={() => onCardSelect(card)}>
          <h3>{card.title}</h3>
          <p>@{card.url}</p>
          <a href={card.link}>{card.link}</a>
        </div>
      ))}

      
    </div>
  )
}
