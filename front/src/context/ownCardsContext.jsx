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

    // Fetch cards function
    const fetchCards = async () => {
        if (user && user.googleId) {
            setLoading(true);
            try {
                const response = await axios.get(`/cards/cards?googleId=${user.googleId}`, {
                    withCredentials: true,
                });
                setOwnCards(response.data);
                setError(null); // Clear any previous errors
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Handles both success and failure
            }
        }
    };

    // Fetch cards initially when the user changes
    useEffect(() => {
        fetchCards();
    }, [user]);

    return (
        <OwnCardsContext.Provider value={{ ownCards, loading, error, refetch: fetchCards }}>
            {children}
        </OwnCardsContext.Provider>
    );
};

export default OwnCardsProvider;
