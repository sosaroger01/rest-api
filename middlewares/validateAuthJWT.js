
const jwt=require("jsonwebtoken");

const User = require("../models/user");

const isAuthenticated= async(req,res,next)=>{
    
    const authHeader=req.header("Authorization");

    if(!authHeader) {
        return res.status(401).json({msg:"Usuario no autenticado"});
    }

    // Obtener el Token 
    const token = authHeader.split(' ')[1];

    // comprobar el JWT
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY );

        //obtener informacion del usuario autenticado
        const user=await User.findById(uid);
        
        //validar si el usuario es valido 
        if(!user || !user.status) {
            return res.status(401).json({msg:"Token no válido"});
        }

        req.user=user;

        next();
    } catch (error) {
        console.log('JWT no valido',error);
        return res.status(401).json({msg:"Token no válido"});
    }

}

module.exports={
    isAuthenticated
}