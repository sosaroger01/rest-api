
const User=require("../models/user"); 
const bcryptjs=require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const login= async(req, res=response) => {
    const {email,password}=req.body;

    try {

        const user=await User.findOne({email,status:true});

        
        //verificar si el correo existe
        if(!user){
            return res.status(400).json({
                msg:"Usuario no existe"
            });
        }

        //validar contraseña
        const isValid=bcryptjs.compareSync(password,user.password);
        if(!isValid){
            return res.status(400).json({
                msg:"Contraseña incorrecta"
            });
        }

        //generar token
        const token= await generateJWT(user.id);

        res.json({
            "msg":"Auth",
            user,
            token
        })        
    } catch (error) {
        res.status(500).json({msg:"Ha ocurrido un error, por favor contacte al administrador"});
    }
}


module.exports={
    login
}