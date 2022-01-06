const express=require('express');
const cors=require("cors");

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
            "search":"/api/search"
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
    }

    routes(){
        this.app.use(this.paths.auth,require("../routes/auth"))
        this.app.use(this.paths.categories,require("../routes/categories"))
        this.app.use(this.paths.users,require("../routes/users"))
        this.app.use(this.paths.products,require("../routes/products"))
        this.app.use(this.paths.search,require("../routes/search"))
    }

    
    listen(){
        const server=this.app.listen(process.env.PORT,()=>{
            console.log("Servidor corriendo en el puerto "+this.port)
        })

        server.timeout = 40000;
    }

}

module.exports=Server;