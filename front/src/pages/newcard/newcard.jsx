import React from "react";
import TopBar from "./topbar/topbar";
import "./newcard.css";
import Layout from './../../components/layout/layout';
import CardList from './../../components/cardsList/cardsList'
import PhoneView from './phoneView/phoneView'

export default function NewCard({setSelectedCard}) {
  return (
  
    <>
      <div className="detailsContainer">
      
      <div className="cardDetails">
      <TopBar setSelectedCard={setSelectedCard}/>
      </div>
    
      
      <PhoneView />
     
     
      
      </div>
     
      </>
  

   
  );
}
