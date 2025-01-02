import React from 'react';
import './cardDetails.css';
import PhoneView from './phoneView';
import TopBar from '../../components/topbar/topbar'

export default function CardDetails({ card }) {
  return (
    <>
    <div className="detailsContainer">
    <div className="cardDetails">
      <TopBar card={card} />
      
        {/* <input type="text" value={card.title} contentEditable/> */}
        {/* <h className="urlCard">{card.url}</h>
        <p className="descriptionCard">{card.description}</p> */}
     
     
    </div>                                        
     <PhoneView card={card} />

    </div>
 

     </>
  );
}
