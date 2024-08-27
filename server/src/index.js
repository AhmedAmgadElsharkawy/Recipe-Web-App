import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser"
import env from "dotenv" 
import { userRouter } from "./routes/users.js";
import cors from "cors"
import { recipesRouter } from "./routes/recipes.js";

env.config();
mongoose.connect(process.env.MONGODB_URL);
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use("/auth",userRouter);
app.use("/recipes",recipesRouter)



app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})
