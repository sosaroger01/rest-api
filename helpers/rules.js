const Role = require("../models/role");
const User = require("../models/user");

/**
 * 
 * @param {String} role 
 */
const isValidRole=async (role='')=>{

    const existsRole=await Role.findOne({role});

    if(!existsRole){
        throw new Error(`Rol (${role}) no existe`);
    }

}

/**
 * 
 * @param {String} email 
 */
const existsEmail=async (email='')=>{

    const emailExists=await User.findOne({email});

    if(emailExists){
        throw new Error(`El correo (${email}) ya se encuentra registrado`);
    }

}

/**
 * 
 * @param {String} id 
 */
const existsUserById=async (id )=>{

    const user=await User.findById(id);

    if(!user){
        throw new Error(`Usuario con id (${id}) no existe`);
    }

}

module.exports={
    isValidRole,
    existsEmail,
    existsUserById
}