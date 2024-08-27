import mongoose from "mongoose";

//class
const userSchema = new mongoose.Schema({
    username : {type: String ,required : true,unique:true},
    password : {type: String ,required : true},
    savedRecipes:[{type:mongoose.Schema.Types.ObjectId ,ref: "recipes"}]
})

//method
export const UserModel = mongoose.model("users",userSchema);