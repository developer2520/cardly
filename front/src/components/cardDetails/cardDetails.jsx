import React from 'react';
import './cardDetails.css';
import PhoneView from './phoneView';

export default function CardDetails({ card }) {
  return (
    <>
    <div className="detailsContainer">
    <div className="cardDetails">
      
        <h1 className='titleDetail'>{card.title}</h1>
        <h className="urlCard">{card.url}</h>
        <p className="descriptionCard">{card.description}</p>
     
     
    </div>
     <PhoneView card={card} />

    </div>
 

     </>
  );
}
