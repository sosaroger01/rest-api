const express=require('express');
const cors=require("cors");

const DBConnection = require('../database/config');

class Server {
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.usersPath="/api/users";

        //Connection database
        this.database();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async database(){
        await DBConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Parse Json Request
        this.app.use( express.json() );

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath,require("../routes/users"))
    }

    
    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log("Servidor corriendo en el puerto "+this.port)
        })
    }

}

module.exports=Server;