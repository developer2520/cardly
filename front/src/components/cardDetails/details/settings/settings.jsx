import React, { useContext } from "react";
import { OwnCardsContext } from "./../../../../context/ownCardsContext";
import axios from "axios";

const Settings = ({ card, setSelectedCard }) => {
    const { refetch } = useContext(OwnCardsContext); 

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            try {
                
                await axios.delete(`/cards/${card._id}`);
                alert("Card deleted successfully!");
                setSelectedCard(null); 
                refetch()// Send DELETE request to the server
                // Refetch data to update the state in the context
            } catch (err) {
                console.error("Error deleting card:", err.message);
                alert("Failed to delete card. Please try again.");
            }
        }
    };

    return (
        <div className="card-details">
            
            <div className="actions">
                <button className="delete-button" onClick={handleDelete}>
                    Delete Card
                </button>
            </div>
        </div>
    );
};

export default Settings;
