const path=require("path");
const fs= require("fs");
const { response } = require("express");

const {uploadFile : upload} = require("../helpers");
const { Product, User } = require("../models");


 /**
  * Metodo generico para realizar busqueda en las colecciones disponibles
  * @param {*} req 
  * @param {*} resp 
  * @returns 
  */
const uploadFile=async (req,res=response)=>{ 
    try {
        const name=await upload({folder:"imgs",files:req.files});
        res.json({name})
    } catch (error) {
        res.status(400).json({error}) 
    }

    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns json
 */
const updateFile=async (req,res=response)=>{

    const {id,collection}=req.params;
   
    let model;

    switch (collection) {
        case "product":
            model=await Product.findById(id);
            
            if(!model){
                return res.status(400).json({"msg":`No existe un producto con el ID ${id}`});
            }

            break;
        case "user":
            model=await User.findById(id);
            
            if(!model){
                return res.status(400).json({"msg":`No existe un usuario con el ID ${id}`});
            }

            break;
        default:
            resp.status(500).json({"msg":"Error al encontrar colección"});
    }

    try {

        //Limpiar imagenes previas
        if ( model.img ){
            //borrar img
            const pathDelete =path.join( __dirname , '../uploads/', collection , model.img);
            if( fs.existsSync(pathDelete) ){
                fs.unlinkSync(pathDelete);
            }
        }

        const name=await upload({folder:collection,files:req.files});
        model.img=name;
        model.save();
        
        res.json({model})
    } catch (error) {
        res.status(400).json({error}) 
    }

    
}


const showFile=async (req,res=response)=>{

    const {id,collection}=req.params;
   
    let model;

    switch (collection) {
        case "product":
            model=await Product.findById(id);
            
            if(!model){
                return res.status(400).json({"msg":`No existe un producto con el ID ${id}`});
            }

            break;
        case "user":
            model=await User.findById(id);
            
            if(!model){
                return res.status(400).json({"msg":`No existe un usuario con el ID ${id}`});
            }

            break;
        default:
            res.status(500).json({"msg":"Error al encontrar colección"});
    }

    try {
        //Limpiar imagenes previas
        if ( model.img ){
            //borrar img
            const pathDelete =path.join( __dirname , '../uploads/', collection , model.img);
            if( fs.existsSync(pathDelete) ){
                return res.sendFile(pathDelete);
            }
        }

        const pathDefault =path.join( __dirname , '../assets/',process.env.DEFAULT_IMAGE);

        res.sendFile(pathDefault);
    } catch (error) {
        res.status(400).json({error}) 
    }

    
}

module.exports={
    uploadFile,
    updateFile,
    showFile
}