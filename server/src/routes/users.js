import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/users.js";
import env from "dotenv"

env.config();
const router = express.Router();

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const check = await jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
            if (!check)
                return res.sendStatus(401);
            const payload = await jwt.decode(token)
            const response = await UserModel.findOne({ _id: payload.id })
            if (!response) { return res.sendStatus(401);}
            req.user = response
            next();
        }
        else
            return res.sendStatus(401);
    } catch (error) {
        console.error(error)
    }
    
}

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username })
    if (user)
        return res.json(user);
    const hashedpassword = await bcrypt.hash(password, 10)
    //salt rounds default is 10
    const newUser = new UserModel({ username: username, password: hashedpassword });
    newUser.save();
    //can use await UserModel.create() to not use save method
    //attach user at a json format to the respond body to be displayed
    res.json({ message: "new user has been registered successfully!" })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user)
        return res.json({ message: "User doesn't exist" })
    const checkPass = await bcrypt.compare(password, user.password)
    if (!checkPass)
        return res.json({ message: "User or Passwoerd is incorrect" });

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_KEY);
    res.cookie('access_token', token, {
        expires: new Date(Date.now() + 3600000), // 1 hour from now
    });
    res.json({ token:true, userid: user._id });
})

router.get("/verifyToken",isAuthenticated, (req, res) => {
    return res.sendStatus(202);
})

export { router as userRouter }


