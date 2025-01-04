import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbConnect from './config/mongoose.config.js';
import extractValidationErrors from './util/ErrorExtractor.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import gameEngineEntryRouter from './routes/gameEngineEntry.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const allowedOrigins = process.env.ORIGIN_KEY

app.use(express.json(), cors({ credentials: true, origin: allowedOrigins }), cookieParser());
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/gameEngineEntries", gameEngineEntryRouter)


dbConnect();

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    error.name = "Not Found";
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error.statusCode);
    error.name === "ValidationError" ? error.statusCode = 400 : "";
    // console.log(error.errors)

    // Normalize the error
    const normalizedError = {
        statusCode: error.statusCode || 500,
        message: error.message || 'Something went wrong',
        name: error.name || 'Server Error',
        validationErrors: extractValidationErrors(error)
    };

    // Return the normalized error
    res.status(normalizedError.statusCode).json(normalizedError);
});

app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);
