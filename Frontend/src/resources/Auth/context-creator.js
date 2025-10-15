import { createContext } from 'react'

const authState = {
    isUserSignedIn: false,
    // signOut: async () => { 
        // sign out function here
    // },
    username: "",    
    loggedAt: new Date()
}


export const AuthContext = createContext(authState)