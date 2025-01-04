import { Router } from "express";
import { authenticate } from "../config/jwt.config.js";
import { createUser, getAllUsers, getOneUserById, updateOneUserById, deleteOneUserById } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.route("/")
.get(getAllUsers)
.post(createUser)

userRouter.route("/:id")
.get(authenticate,getOneUserById)
.put(authenticate,updateOneUserById)
.delete(authenticate,deleteOneUserById)

export default userRouter