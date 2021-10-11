const {response} = require("express");
const bcryptjs=require("bcryptjs");

const User=require("../models/user"); 

const get= async (req, res=response) => {

    let {page,limit}=req.query;

    const offset= (page-1)*limit;

    //condicion para los querys
    const query={status:true};

    //ejecucion de querys
    const [total,users]=await Promise.all([
        User.countDocuments(query),
        User.find(query)
                .skip(offset)
                .limit(limit)
    ]);

    //capturar 
    const pages=Math.round(total/limit);

    res.json({
        total,
        pages,
        users
    })
}

const store= async(req, res=response) => {
    const {name,email,role,password}=req.body;
    const user=new User( {name,email,role,password} );

    //hash de contraseña
    const salt=bcryptjs.genSaltSync();
    user.password=bcryptjs.hashSync(password,salt);

    //Guardar en bases de datos
    await user.save();

    res.status(201).json({
        "msg":"Usuario creado",
        user
    })
}

const update= async(req, res=response) => {

    const {id}= req.params;
    const {_id,password,google,email,...data}=req.body;

    //validar password
    if( password ){
        const salt=bcryptjs.genSaltSync();
        data.password=bcryptjs.hashSync(password,salt);
    }

    const user= await User.findByIdAndUpdate(id,data)

    res.json({
        "msg":"Usuario actualizado",
        user
    })
}

const destroy= async(req, res=response) => {

    const {id}=req.params;

    const user= await User.findByIdAndUpdate(id,{status:false});

    res.json({
        "msg":"Usuario eliminado",
        user
    })
}


module.exports={
    get,
    store,
    update,
    destroy
}