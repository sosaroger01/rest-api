const jwt=require("jsonwebtoken");

const generateJWT= async (uid='')=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if( err ){
                reject("No se pudo crear el JWT");
            }else{
                resolve(token);
            }
        })
    })
}

module.exports={
    generateJWT
}