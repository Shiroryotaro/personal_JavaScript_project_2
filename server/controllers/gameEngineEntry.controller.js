import gameEngineEntry from "../models/gameEngineEntry.model.js";

//CREATE
async function createGameEngineEntry(req, res, next) {
    try {
        const newEntry = await gameEngineEntry.create({
            ...req.body,
            userId: req.user._id // Attach the authenticated user's ID
        });
        res.status(201).json(newEntry); //201 means created
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//READ
async function getAllGameEngineEntries(req, res, next) {
    try {
        const allEntries = await gameEngineEntry.find(); // here is our query to find Books
        res.status(200).json(allEntries); //200 means good job no error
    } catch(error) {
        console.log(error);
    }
}

async function getOneGameEngineEntryById(req, res, next) {
    const foundGameEntry = await gameEngineEntry.findById(req.params.id);
    try {
        if (!foundGameEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        if (foundGameEntry.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to view this entry" });
        }
        res.status(200).json(foundGameEntry);
    } catch(error) {
        console.log(error);
        next(error)
    }
}

//UPDATE
async function updateOneGameEngineEntryById(req, res, next) {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const entry = await gameEngineEntry.findById(req.params.id)

        //Check if entries exists/ if user is authorized
        if(!entry){
            return res.status(404).json({message: "Entry not found"})
        }

        if (entry.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this entry" });
        }

        const updatedGameEntry = await gameEngineEntry.findByIdAndUpdate(req.params.id, req.body, options);
        res.status(200).json(updatedGameEntry);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//DELETE
async function deleteOneGameEngineEntryById(req, res, next) {
    try {
        const entry = await gameEngineEntry.findById(req.params.id)

        //Check if entries exists/ if user is authorized
        if(!entry){
            return res.status(404).json({message: "Entry not found"})
        }

        if (entry.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this entry" });
        }

        const deletedGameEntry = await gameEngineEntry.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedGameEntry);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export {
    createGameEngineEntry,
    getAllGameEngineEntries,
    getOneGameEngineEntryById,
    updateOneGameEngineEntryById,
    deleteOneGameEngineEntryById
}
