import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export function AutoLogin({ children }) {
    const [cookies] = useCookies();
    const token = cookies.access_token;
    const auth = useAuth();
    const [check, setCheck] = useState(false);
    useEffect(() => {
        const verifyToken = async () => {
            if (!token)
                setCheck(false)
            else {
                try {
                    const response = await axios.get("http://localhost:3000/auth/verifyToken", { headers: { authorization: token } })
                    setCheck(true); 
                    auth.login();
                } catch (error) {
                    if (error.response){
                            setCheck(false); 
                            auth.logout(); 
                        }
                    else  console.error(error)
                }
            }
        }
        verifyToken()
    })
    if (!check)
        return children
    return (<Navigate to={auth.redirectRoute} />)
}   