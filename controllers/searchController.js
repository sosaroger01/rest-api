const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const {Category,Role,User,Product} = require("../models");
const product = require("../models/product");

const availableCollections=[
    "product",
    "category",
    "user",
    "role",
]

/**
 * Funcion usada para buscar sobre la coleccion de usuarios
 * @param {*} term 
 * @param {*} resp 
 */
const searchUser=async (term="",resp=response)=>{

   const isMongoID =  isValidObjectId(term);

   if( isMongoID ){
       const user=await User.findById(term);
       return resp.json({
        results:user ? [user] : []
       })
   }

   const regex = new RegExp (term, 'i' ); 

   const users=await User.find({
       $or:[{name:regex},{email:regex}],
       $and:[{status:true}]
   });
    resp.json({
    results:users
    })
}


/**
 * Funcion usada para buscar sobre la coleccion de categorias
 * @param {*} term 
 * @param {*} resp 
 */
 const searchCategory=async (term="",resp=response)=>{

    const isMongoID =  isValidObjectId(term);
 
    if( isMongoID ){
        const category=await Category.findById(term);
        return resp.json({
         results:category ? [category] : []
        })
    }
 
    const regex = new RegExp (term, 'i' ); 
 
    const categories=await Category.find({name:regex,status:true});
     resp.json({
        results:categories
     })
 }


 /**
 * Funcion usada para buscar sobre la coleccion de productos
 * @param {*} term 
 * @param {*} resp 
 */
  const searchProduct=async (term="",resp=response)=>{

    const isMongoID =  isValidObjectId(term);
 
    if( isMongoID ){
        const product=await Product.findById(term)                
        .populate({ path: 'created_by', select: 'name status' })
        .populate({ path: 'category', select: 'name' });

        return resp.json({
         results:product ? [product] : []
        })
    }
 
    const regex = new RegExp (term, 'i' ); 
 
    const products=await Product.find({name:regex})
    .populate({ path: 'created_by', select: 'name status' })
    .populate({ path: 'category', select: 'name' });

     return resp.json({
        results:products
     })
 }

const search=async (req,resp=response)=>{

    const {collection,term} = req.params;

    if( !availableCollections.includes(collection) )
    {
        return resp.status(400).json({
            "msg":`Las colecciones permitidas son: ${availableCollections}`
        })
    }

    switch (collection) {
        case "product":
            searchProduct(term,resp);
             break;
        case "category":
            searchCategory(term,resp);
             break;
        case "user":
            searchUser(term,resp);
             break;
        default:
            resp.status(500).json({"msg":"Error al encontrar colección"});
    }
}


module.exports={
    search
}