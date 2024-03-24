import { Server } from "http"
import mongoose from "mongoose";
import app from "./app";
import config from "./config";


let server: Server;

async function bootstrap() {
    try {
        await mongoose.connect(config.database_url as string);
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

process.on('SIGTERM', () => {
    if(server){
        server.close();
    }
})