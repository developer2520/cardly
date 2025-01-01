import React from 'react';
import './phoneView.css';
import Iphone14 from './../../assets/14Iphone.png';

export default function PhoneView({ card }) {
  return (
    <div className="phoneView">

      
      <img className="iphoneFrame" src={Iphone14} alt="iPhone Frame" />
      <iframe 
        src={card.url} 
        
        title="Phone View Content" 
        allowFullScreen
      ></iframe>
    </div>
  );
}
