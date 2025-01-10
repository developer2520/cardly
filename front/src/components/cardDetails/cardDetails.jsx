import React from 'react';
import './cardDetails.css';
import PhoneView from './phoneView';
import TopBar from '../../components/topbar/topbar'

export default function CardDetails({ card }) {

  document.title = `${card.title}`
  return (
    <>
    <div className="detailsContainer">
    <div className="cardDetails">
      <TopBar card={card} />
      
     
     
     
    </div>                                        
     <PhoneView card={card} />

    </div>
 

     </>
  );
}
