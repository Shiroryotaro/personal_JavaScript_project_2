import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.model.js"

//REGISTER
async function register(req, res, next) {
    try{
        const {firstName, lastName, email, password, confirmPassword} = req.body

        const user = new User ({firstName, lastName, email, password, confirmPassword})
        await user.save()

        const payload = { id: user._id}
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5h' })

        res.cookie("userToken", token, {httpOnly: true}).json({message: "Registered Successfully", token})
    } catch(error) {
        console.log(error);
        next(error)
    }
}

//LOGIN
async function login(req, res, next) {
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const payload = { id: user._id}
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5h' })

        res.cookie("userToken", token, {httpOnly: true}).json({message: "Logged In Successfully", token})
    } catch(error) {
        console.log(error);
        next(error)
    }
}

//LOGOUT
async function logout(req, res) {
    res.clearCookie("userToken") // fixed cookie name from token to userToken
    res.status(200).json({message: "Logged Out Successfully"})
}

export {
    register,
    login,
    logout
}

