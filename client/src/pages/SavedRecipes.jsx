import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function SavedRecipes (){
    const [savedRecipes,setSavedRecipes] = useState([])
    const [cookies] = useCookies()
    useEffect(() => {
        async function getSavedRecipes() {
            try {
                const saved = await axios.get("http://localhost:3000/recipes/savedRecipes",{headers:{Authorization:cookies.access_token}})
                setSavedRecipes(saved.data)
            } catch (error) {
                console.error(error)
            }
        }
        getSavedRecipes();
    },[])
    return(
            <div>
                <ul>
                    {savedRecipes.map((recipe) => { return(
                        <li key={recipe._id}>
                            <div>
                                <h2>{recipe.name}</h2>
                            </div>
                            <div className="instructions">
                                <p>{recipe.instructions}</p>
                            </div>
                            <img src={recipe.imageUrl} alt={recipe.name} />
                            <p>Cooking Time: {recipe.cookingTime} minutes</p>
                        </li>)
                    })}
                </ul>
            </div>
    );
}

export default SavedRecipes;