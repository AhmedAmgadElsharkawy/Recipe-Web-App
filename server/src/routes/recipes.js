import { recipeModel } from "../models/recipes.js";
import { UserModel } from "../models/users.js";
import express from "express"
import jwt from "jsonwebtoken"
import { isAuthenticated } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await recipeModel.find({})
        res.json(response);
    } catch (error) {
        console.log(error)
    }
})



router.post("/", async (req, res) => {
    const { recipe, access_token } = req.body
    recipe.userOwner = jwt.decode(access_token).id;
    const newRecipe = new recipeModel(recipe);
    try {
        const response = await newRecipe.save(); //will return the object
        res.json(response);
    } catch (error) {
        console.log(error)
    }
})

router.patch("/", isAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id });
        const check = user.savedRecipes.find((recipeID) => recipeID == req.body.recipeID)
        if (!check) {
            user.savedRecipes.push(req.body.recipeID)
            await user.save();
        }
        res.json({ savedRecipes: user.savedRecipes })
    } catch (error) {
        console.error(error);
    }
})

router.get("/savedRecipes/id", isAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id)
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (error) {
        console.log(error)
    }
})

router.get("/savedRecipes", isAuthenticated, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id)
        console.log(user)
        const savedRecipes = await recipeModel.find({ _id: { $in: user.savedRecipes } })
        console.log(savedRecipes)
        res.json(savedRecipes);
    } catch (error) {
        console.log(error)
    }
})



export { router as recipesRouter };