import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { useCookies } from "react-cookie";

function Navbar() {
    const auth = useAuth();
    const navigate = useNavigate();
    const onClick = (event)=>{
        auth.logout();
        navigate("/auth",{replace:true})
    }
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-recipes">CreateRecipe</Link>
            <Link to="/saved-recipes">SavedRecipes</Link>
            { auth.authenticated ? <button className="logout-button" onClick={onClick}>Log out</button> : <Link to="/auth">Login/Register</Link>}
        </div>
    );
}

export default Navbar;