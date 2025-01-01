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
        const fetchCards = async () => {
            if (user && user.googleId) {
                try {
                    const response = await axios.get(`http://localhost:4000/cards?googleId=${user.googleId}`, {
                        withCredentials: true,
                    });
                    setOwnCards(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false); // Handles both success and failure
                }
            }                
        };

        fetchCards();
    }, [user]);

    return (
        <OwnCardsContext.Provider value={{ ownCards, loading, error }}>
            {children}
        </OwnCardsContext.Provider>
    );
};

export default OwnCardsProvider;
