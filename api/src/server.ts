import { Server } from "http"
import mongoose from "mongoose";
import app from "./app";


let server: Server;

async function bootstrap() {
    try {
        await mongoose.connect(process.env.MONGO as string);
        console.log("Database is Connected Sucessfully !!");
        server = app.listen(process.env.PORT, () => {
            console.log(`Application Listenting on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Failed to connect Database!!");
    }

    process.on("unhandledRejection", error => {
        if(server){
            server.close(() => {
                process.exit(1);
                console.log("Un handle Rejection Cought !!")
            });
        }else{
            process.exit(1)
        }
    })

}
bootstrap();