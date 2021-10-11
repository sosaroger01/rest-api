const { response } = require("express");


const isAdminRole=(req,res=response,next)=>{

    if(!req.user){
        return res.status(500).json({msg:"Error al obtener datos del usuario autenticado"});    
    }

    const {role,name}=req.user;


    if(role!="ADMIN_ROLE"){
        return res.status(403).json({msg:`Acceso no permitido para el usuario ${name}`})
    }

    next();
}


const hasRole=(...roles)=>{
    return (req,res=response,next)=>{
        const {role,name}=req.user;

        if(!roles.includes(role)){
            return res.status(403).json({msg:`Acceso no permitido para el usuario ${name}`})
        }

        next();
    }
}

module.exports={
    isAdminRole,
    hasRole
}