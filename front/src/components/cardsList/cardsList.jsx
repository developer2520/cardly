import {React, useContext, useEffect, useState} from 'react'
import './cardsList.css'
import { OwnCardsContext } from '../../context/ownCardsContext'
import { Link } from 'react-router-dom';


export default function cardsList({onCardSelect}) {
  const { ownCards, loading, error } = useContext(OwnCardsContext);
  const [notVisible, setNotVisible] = useState(false)

  const handleVisible = () => {
    setNotVisible(!notVisible)
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
      <Link className='addNewLink button-58' to="/home/newcard">Create new card</Link>

      </div>
     
      {ownCards.map((card) => (
        <div key={card._id} className="card" onClick={() => onCardSelect(card)}>
          <h3>{card.title}</h3>
          <p>@{card.url}</p>
          <a href={card.link}>{card.link}</a>
        </div>
      ))}

      
    </div>
  )
}
