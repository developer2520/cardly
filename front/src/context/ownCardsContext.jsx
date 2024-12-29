// src/contexts/OwnCardsContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext"; // Correct relative path

// Create the context
export const OwnCardsContext = createContext();

// Create a provider component
export const OwnCardsProvider = ({ children }) => {
    const { user } = useContext(UserContext); // Access `user` from UserContext
    const [ownCards, setOwnCards] = useState([]); // To store user's cards
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        // Fetch user's cards only when the user data (googleId) is available
        if (user && user.googleId) {
            axios.get(`http://localhost:4000/cards?googleId=${user.googleId}`, { withCredentials: true })
                .then(response => {
                    setOwnCards(response.data); // Update ownCards state
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setLoading(false); // Stop loading if user is not available
        }
    }, [user]);

    return (
        <OwnCardsContext.Provider value={{ ownCards, loading, error }}>
            {children}
        </OwnCardsContext.Provider>
    );
};

export default OwnCardsProvider;
