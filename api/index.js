import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctor.js'

const port = 5000;

const app = express();
dotenv.config();

app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());

mongoose.connection.on("disconnected", () =>{
    console.log("Disconnected")
})
const connect = async () =>{
    try{
        mongoose.connect(process.env.MONGO)
        console.log("Conntected to Mongodb")
    }catch(err){
        console.log(err)
    }
}
app.use('/', doctorRoutes)
app.get('/', (req, res) => {
    res.send("hello it/s running")
})
app.listen(process.env.PORT || port , ()=>{connect(); console.log("Started")})