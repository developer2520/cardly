import React, { createContext, useState } from "react";
import axios from "axios";

// Create the UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        loading: false,
        error: null,
    });

    // Function to fetch user data (exported)
    const fetchUser = async () => {
        setState((prev) => ({ ...prev, loading: true }));
        try {
            const { data } = await axios.get("/auth/user", { withCredentials: true });
            setState({ user: data, loading: false, error: null });
        } catch (error) {
            setState({
                user: null,
                loading: false,
                error: error.response ? error.response.data.error : error.message,
            });
        }
    };

    return (
        <UserContext.Provider value={{ ...state, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
