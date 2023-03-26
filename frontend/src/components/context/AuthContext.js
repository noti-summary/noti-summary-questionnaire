import { createContext } from "react";
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState("");

    const [adminInfo, setAdminInfo] = useState({"username": "", "password": ""});
    
    const isUserLoggedIn = () => !!user;

    return (
        <AuthContext.Provider 
            value={{
                user,  
                setUser,
                isUserLoggedIn,
                adminInfo,
                setAdminInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
