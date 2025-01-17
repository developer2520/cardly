import React from 'react';
import './cardDetails.css';
import PhoneView from './phoneView';
import TopBar from './topbar/topbar'

export default function CardDetails({ card, setSelectedCard }) {

  document.title = `${card.title} | Cardly`
  return (
    <>
    <div className="detailsContainer">
    <div className="cardDetails">
      <TopBar card={card} setSelectedCard={setSelectedCard} />
      
     
     
     
    </div>                                        
     <PhoneView card={card} />

    </div>
 

     </>
  );
}
