import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes,setSavedRecipes] = useState([])
    const [cookies] = useCookies();
    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await axios.get("http://localhost:3000/recipes",{headers:{Authorization:cookies.access_token}});
                setRecipes(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        async function getSavedRecipes() {
            try {
                const saved = await axios.get("http://localhost:3000/recipes/savedRecipes/id",{headers:{Authorization:cookies.access_token}})
                setSavedRecipes(saved.data.savedRecipes)
            } catch (error) {
                console.error(error)
            }
        }
        getRecipes();
        getSavedRecipes();
    }, [])

    const saveRecipe = async(recipeID)=>{
        try {
            const response = await axios.patch("http://localhost:3000/recipes",{recipeID},{headers:{Authorization:cookies.access_token}})            
            setSavedRecipes(response.data.savedRecipes)
        } catch (error) {
            console.error(error)
        }
    }

    const isSaved = (recipeID)=>{
        return savedRecipes.find(recipe => recipe == recipeID)
    }

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => { return(
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={()=>{saveRecipe(recipe._id)}} disabled = {isSaved(recipe._id)}>{isSaved(recipe._id) ? "saved" : "save"}</button>
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

export default Home;