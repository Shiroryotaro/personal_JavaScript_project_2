import User from "../models/user.model.js";

// CREATE
async function createUser(req, res, next) {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser); //201 means created
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// READ
async function getAllUsers(req, res, next) {
    try {
        const allUsers = await User.find(); // here is our query to find Books
        res.status(200).json(allUsers); //200 means good job no error
    } catch(error) {
        console.log(error);
        next(error)
    }
}

async function getOneUserById(req, res, next) {
    try {
        const foundUser = await User.findById(req.params.id);
        res.json(foundUser);
    } catch(error) {
        console.log(error);
        next(error)
    }
}

// UPDATE
async function updateOneUserById(req, res, next) {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, options);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//DELETE
async function deleteOneUserById(req, res, next) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export {
    createUser,
    getAllUsers,
    getOneUserById,
    updateOneUserById,
    deleteOneUserById
};