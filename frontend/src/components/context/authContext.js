import { createContext } from "react";
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState("");
    
    const isUserLoggedIn = () => !!user;

    return (
        <AuthContext.Provider 
            value={{
                user,  
                setUser,
                isUserLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
