import { Router } from "express";
import { createGameEngineEntry, deleteOneGameEngineEntryById, getAllGameEngineEntries, getOneGameEngineEntryById, updateOneGameEngineEntryById } from "../controllers/gameEngineEntry.controller.js";
import { authenticate } from "../config/jwt.config.js";

const gameEngineEntryRouter = Router()

gameEngineEntryRouter.route("/")
.get(authenticate,getAllGameEngineEntries)
.post(authenticate,createGameEngineEntry)

gameEngineEntryRouter.route("/:id")
.get(authenticate,getOneGameEngineEntryById)
.put(authenticate,updateOneGameEngineEntryById)
.delete(authenticate,deleteOneGameEngineEntryById)

export default gameEngineEntryRouter
