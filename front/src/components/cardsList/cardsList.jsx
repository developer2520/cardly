import {React, useContext, useEffect} from 'react'
import './cardsList.css'
import { OwnCardsContext } from '../../context/ownCardsContext'
import { Link } from 'react-router-dom';


export default function cardsList() {
 const { ownCards, loading: cardsLoading, error: cardsError } = useContext(OwnCardsContext);
    
  return (
    <div className='cardlist'>
      {ownCards.map((card) => (
        <div key={card._id} className="card">
          <h3>{card.title}</h3>
          <p>@{card.url}</p>
          <a href={card.link}>{card.link}</a>
        </div>
      ))}

      <Link to="/newcard">Create new card</Link>
    </div>
  )
}
