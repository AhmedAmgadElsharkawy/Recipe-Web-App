import { useState } from "react"
import axios from "axios"
import Form from "./Form";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/register", {
                username,
                password,
              });
            alert("successfully registered, please login!")
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
            label = "Register"
            onSubmit = {onSubmit}
        />
    )
}

export default Register;