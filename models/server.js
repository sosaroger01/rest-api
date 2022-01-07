const express=require('express');
const cors=require("cors");
const fileUpload=require("express-fileUpload");

const DBConnection = require('../database/config');

class Server {
    constructor(){
        this.app=express();
        this.port=process.env.PORT;

        this.paths={
            "users":"/api/users",
            "categories":"/api/categories",
            "auth":"/api/auth",
            "products":"/api/products",
            "search":"/api/search",
            "uploads":"/api/uploads"
        }

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

        //Fileupload - Carga de archivos 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
        
    }

    routes(){
        this.app.use(this.paths.auth,require("../routes/auth"))
        this.app.use(this.paths.categories,require("../routes/categories"))
        this.app.use(this.paths.users,require("../routes/users"))
        this.app.use(this.paths.products,require("../routes/products"))
        this.app.use(this.paths.search,require("../routes/search"))
        this.app.use(this.paths.uploads,require("../routes/uploads"))
    }

    
    listen(){
        const server=this.app.listen(process.env.PORT,()=>{
            console.log("Servidor corriendo en el puerto "+this.port)
        })

        server.timeout = 40000;
    }

}

module.exports=Server;