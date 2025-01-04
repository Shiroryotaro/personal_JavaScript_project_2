import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate =  async (req, res, next) => {
    const token = req.cookies.userToken || req.headers.authorization?.split(" ")[1]; // Extract token from cookies or headers
    if (!token) {
    return res.status(401).json({ verified: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(decoded.id).select("-password")

        if(!user){
            return res.status(401).json({ verified: false, message: "User not found" })
        }

        req.user = user //Attach user object to the request
        next(); // Proceed to the next middleware or route handler
    } catch(error){
        console.log(error)
        res.status(401).json({ verified: false, message: "Invalid or expired token" });
    }
};