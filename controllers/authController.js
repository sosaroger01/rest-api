
const User=require("../models/user"); 
const bcryptjs=require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSignIn= async (req, res=respons)=>{
    let {token}= req.body;

    try { 
        const {email,name,img}=await googleVerify(token);

        let user=await User.findOne({email});

        if(!user){
            //Crear usuario
            const data={
                name,
                email,
                img,
                password:".",
                google:true

            };

            user=new User(data);
            await user.save();
        }

        //validar status
        if(!user.status){
            res.status(403).json({msg:"Usuario bloqueado"});
        }

        //generar token
        token= await generateJWT(user.id);
    
        res.json({
            "msg":"Auth Google",
            user,
            token
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Error al verificar token"});
    }
}

module.exports={
    login,
    googleSignIn
}