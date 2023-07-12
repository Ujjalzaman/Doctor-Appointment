import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
// import doctorRoutes from './routes/doctor.js'
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app = express();

//Middlewares
app.use(cors());
app.use(cookieParser())
dotenv.config();
app.use(express.json())
app.use(bodyParser.json());
app.use(express.static('doctors'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// app.use('/', doctorRoutes)
app.use(globalErrorHandler);
app.get('/', (req, res) => {
    res.send("hello it/s running")
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Something Went Wrong",
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'Api not found !!'
            }
        ],
    })
    next();
})
export default app;