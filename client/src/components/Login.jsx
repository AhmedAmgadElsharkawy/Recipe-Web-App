import { useState } from "react"
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie"
import axios from "axios";
import { useAuth } from "./auth/AuthContext";
 
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies();
    const auth = useAuth()

    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                username,
                password,
              });
            if(response.data.message){
                alert(response.data.message)
                navigate("/auth")
            }
            else if(response.data.token){
                setCookie("access_token",response.data.token)
                auth.login();
                navigate("/",{replace:true});
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
            <Form 
                username  = {username}
                password = {password}
                setPassword = {setPassword}
                setUsername = {setUsername}
                label = "Login"
                onSubmit={onSubmit}
            />
        )
}

export default Login;