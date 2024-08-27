import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom"

function CreateRecipes() {
    const [cookies] = useCookies();
    const access_token = cookies.access_token  
    const navigate = useNavigate();

    const [recipe,setRecipe] = useState({
        name:"",
        instructions:"",
        imageUrl:"",
        cookingTime:0,
        ingredients:[]
    })

    const onChange = (event) => {
        const { name, value } = event.target;
        setRecipe({
            ...recipe,
            [name]:value
        })
    }

    const addIngredient = (event)=>{
        event.preventDefault();
        setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
    }

    const onChangeIngredients = (event,indx)=>{
        const value = event.target.value
        const ingredients = recipe.ingredients;
        ingredients[indx] = value;
        setRecipe({
            ...recipe,ingredients
        });
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3000/recipes",{recipe,access_token});
            alert("recipe created successfully!")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={onChange} value={recipe.name}/>
                <label htmlFor="ingredients" onChange={onChange} value={recipe.ingredients}>ingredients</label>
                {recipe.ingredients.map((ingredient,indx)=>{
                    return(<input key = {indx} name="ingredients" type="text" onChange={(event)=>{onChangeIngredients(event,indx)}} value={ingredient}/>);
                })}
                <button onClick={addIngredient}>+</button>
                <label htmlFor="instructions">instructions</label>
                <textarea name="instructions" id="instructions" onChange={onChange} value={recipe.instructions}></textarea>
                <label htmlFor="imageUrl">imageURL</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={onChange} value={recipe.imageUrl}/>
                <label htmlFor="cookingTime">Cooking Time</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={onChange}  value={recipe.cookingTime}/>
                <button type="submit">Create</button>
            </form>

        </div>
    );
}

export default CreateRecipes;