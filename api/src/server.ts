import {Server} from 'http';
import app from "./app";
import config from './config';

async function bootstrap(){
    const server:Server = app.listen(config.port, () =>{
        console.log(`Server running on port ${config.port}`);
    });

    const exitHandler = () =>{
        if(server){
            server.close(() =>{
                console.log('Server Close')
            })
        }
    };

    const unexpectedHandler = () =>{
        console.log('Handler Error');
        exitHandler();
    }
    process.on('uncaughtException', unexpectedHandler);
    process.on('unhandledRejection', unexpectedHandler);

    process.on('SIGTERM', () =>{
        console.log('Sigterm Recieved');
        if(server){
            server.close();
        }
    })
}

bootstrap();