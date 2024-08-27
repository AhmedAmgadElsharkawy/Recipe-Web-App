import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export function ProtectedRoute(props){
    const auth = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{auth.setRedirectRoute(location.pathname)})
    if(!auth.authenticated) {
        return <Navigate to="/auth"/>
    }
    return(props.children);
}