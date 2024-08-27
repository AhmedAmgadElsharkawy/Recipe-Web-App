import { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";
import { useCookies } from "react-cookie";

const authContext = createContext({authenticated:false});

export const ContextProvider = ({children})=>{
    const [,,removeCookie] = useCookies();

    const [redirectRoute,setRedirectRoute] =  useState("/");
    
    const [authenticated,setAuthentication] = useState(()=>{
        const stored  = sessionStorage.getItem("authenticated")
        return stored ? JSON.parse(stored) : false
    });
    const login = ()=>{
        sessionStorage.setItem("authenticated",JSON.stringify(true))
        return setAuthentication(true);
    }
    const logout = ()=>{
        sessionStorage.removeItem("authenticated")
        removeCookie("access_token")
        return setAuthentication(false);
    }

    return (
        <authContext.Provider value={{authenticated,login,logout,redirectRoute,setRedirectRoute}}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = ()=>{
    return useContext(authContext)
}