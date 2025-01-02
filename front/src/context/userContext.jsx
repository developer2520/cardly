import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/user', {
                    withCredentials: true,
                });
                setState({ user: data, loading: false, error: null });
            } catch (err) {
                setState({ user: null, loading: false, error: err.message });
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
 