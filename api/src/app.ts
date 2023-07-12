import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
// import doctorRoutes from './routes/doctor.js'
import cookieParser from 'cookie-parser';

const app = express();

//Middlewares
app.use(cors());
app.use(cookieParser())
dotenv.config();
app.use(express.json())
app.use(bodyParser.json());
app.use(express.static('doctors'));
app.use(fileUpload());
app.use(express.urlencoded({extended: true}));


// app.use('/', doctorRoutes)
app.get('/', (req, res) => {
    res.send("hello it/s running")
})

app.use((err: any, req: Request, res: Response, next:NextFunction) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something Went Wrong";
    res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
        stack : err.stack,
    })
    next();
})

export default app;
// app.listen(process.env.PORT || port , ()=>{connect(); console.log("Started")})