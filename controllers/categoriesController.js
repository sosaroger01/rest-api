const {response} = require("express");
const bcryptjs=require("bcryptjs");

const { Category } = require("../models");

const get= async (req, res=response) => {
    let {page,limit}=req.query;

    const offset= (page-1)*limit;

    //condicion para los querys
    const query={status:true};


    //ejecucion de querys
    const [total,categories]=await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
                .populate('created_by')
                .skip(offset)
                .limit(limit)
    ]);

    //capturar 
    let pages=Math.round(total/limit);

    pages=pages>1 ? pages : 1;

    res.json({
        total,
        pages,
        categories
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const show= async(req, res=response) => {
    const {id}= req.params;

    const category=await Category.findById(id)
                .populate({ path: 'created_by', select: 'name status' });

    res.json({
        "msg":"Categoria",
        category
    })
}

/**
 * 
 * @param {*} req 
 * @param {response} res 
 */
const store= async(req, res=response) => {
    const name=req.body.name.toUpperCase();

    const data={
        name,
        created_by:req.user._id
    }
    const category=new Category(data);
    await category.save();

    res.status(201).json({
        "msg":"Categoria creada",
        category
    })
}

const update= async(req, res=response) => {

    const {id}= req.params;
    let {name}=req.body;
    name=name.toUpperCase();
    const category= await Category.findByIdAndUpdate(id,{name},{new:true});

    res.json({
        "msg":"Categoría actualizada",
        category
    })
}

const destroy= async(req, res=response) => {

    const {id}=req.params;

    const category= await Category.findByIdAndUpdate(id,{status:false})

    res.json({
        "msg":"Categoría eliminada",
        category
    })
}


module.exports={
    get,
    show,
    store,
    update,
    destroy
}