import { model, Schema, Types } from "mongoose"
// import User from "./user.model";

const gameEngineEntrySchema = new Schema(
    {
        gameEngineName: {
            type: String,
            required: [true, "Game Engine name is required no less than 1 character"],
            minlength: [1,"Game Engine name is required no less than 1 character"]
        },
        reason_description: {
            type: String,
            required: [true, "Reason/Description must be 5 or more characters."],
            minlength: [5, "Reason/Description must be 5 or more characters."]
        },
        openSource: {
            type: Boolean,
            required: [true, "Must be open source or not"],
            default: false
        },
        supportedLanguages: {
            type: String,
            required: [true, "Supported Language(s) must be listed"],
            minlength: [1, "Supported Language(s) must be listed"]
        },
        notableGamesDeveloped: {
            type: String,
            required: [true, "List at least 1 game"],
        },
        yearReleased: {
            type: Number,
            required: [true, "Year of game release required"],
            validate: {
                validator: (value) => value >= 1900 && value <= new Date().getFullYear(),
                message: 'Year must be between 1900 and the current year.'
            }
        },
        cost: {
            type: String,
            required: [true, "The cost of the engine is required whether it be free or etc"],
        },
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, "This field is required"],
        }
    }, { timestamps: true });

const gameEngineEntry = model("gameEngineEntries", gameEngineEntrySchema)
export default gameEngineEntry
