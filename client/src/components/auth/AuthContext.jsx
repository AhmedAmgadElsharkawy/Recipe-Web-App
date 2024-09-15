import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const authContext = createContext({authenticated:false});

export const ContextProvider = ({children})=>{
    const [cookies,,removeCookie] = useCookies();

    const [redirectRoute,setRedirectRoute] =  useState("/");
    
    const [authenticated,setAuthentication] = useState(()=>{
        const stored = cookies["access_token"];
        // const stored  = sessionStorage.getItem("authenticated")
        return stored ? true : false
    });
    const login = ()=>{
        return setAuthentication(true);
    }
    const logout = ()=>{
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