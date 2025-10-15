// src/context/AuthContext.js
import React, { useState } from 'react';
import { AuthContext } from './context-creator';

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    // State to track authentication and user details
    const [state, setState] = useState({
        isUserSignedIn: false,
        username: "",
        loggedAt: ""
    })


    // Function to sign in
    const signIn = (user) => {
        // signin logic
        setState({ ...state, isUserSignedIn: true })
    };

    // Function to sign out
    const signOut = () => {
        // sign out logic
        setState({ ...state, isUserSignedIn: false })
    };

    // Provide context values to children components
    return (
        <AuthContext.Provider value={{ authState: state, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
