import { createContext } from "react";
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({userId: ""});
    
    const setUserAuthInfo = (data) => {
        setUser({userId: data.userId});
    };
    
    const isUserLoggedIn = () => !!user.userId;

    return (
        <AuthContext.Provider 
            value={{
                user, 
                setUser: (userInfo) => setUserAuthInfo(userInfo), 
                isUserLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
