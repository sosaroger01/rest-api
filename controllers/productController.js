const {response} = require("express");
const bcryptjs=require("bcryptjs");

const { Product } = require("../models");

const get= async (req, res=response) => {
    let {page,limit}=req.query;

    const offset= (page-1)*limit;

    //condicion para los querys
    const query={status:true};


    //ejecucion de querys
    const [total,products]=await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
                .populate('created_by')
                .populate('category')
                .skip(offset)
                .limit(limit)
    ]);

    //capturar 
    let pages=Math.round(total/limit);

    pages=pages>1 ? pages : 1;

    res.json({
        total,
        pages,
        products
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show= async(req, res=response) => {
    const {id}= req.params;

    const product=await Product.findById(id)
                .populate({ path: 'created_by', select: 'name status' })
                .populate({ path: 'category', select: 'name' })
                ;

    res.json({
        "msg":"Producto",
        product
    })
}

/**
 * 
 * @param {*} req 
 * @param {response} res 
 */
const store= async(req, res=response) => {
    const {name,description,price,category}=req.body;

    const data={
        name:name.toUpperCase(),
        description,
        price,
        category,
        created_by:req.user._id
    }
    console.log(data);
    const product=new Product(data);
    await product.save();

    res.status(201).json({
        "msg":"Producto creado con exito",
        product
    })
}

const update= async(req, res=response) => {

    const {id}= req.params;
    const {status,created_by,...body}=req.body;

    if(body.name){
        body.name=body.name.toUpperCase()
    }

    const data={
        ...body,
        created_by:req.user._id
    }

    const product= await Product.findByIdAndUpdate(id,data,{new:true});

    res.json({
        "msg":"Producto modificado con exito",
        product
    })
}

const destroy= async(req, res=response) => {

    const {id}=req.params;

    const Product= await Product.findByIdAndUpdate(id,{status:false})

    res.json({
        "msg":"Producto eliminado",
        Product
    })
}


module.exports={
    get,
    show,
    store,
    update,
    destroy
}