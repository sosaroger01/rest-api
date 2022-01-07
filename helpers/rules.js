
const {User,Category,Role, Product} = require("../models");

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

/**
 * 
 * @param {String} name 
 */
 const existsCategory=async (name )=>{

    const category=await Category.findOne({name:name.toUpperCase()});

    if(category){
        throw new Error(`La categoría (${name}) ya se encuentra registrada`);
    }
}

/**
 * 
 * @param {String} id 
 */
 const existsCetagoryById=async (id )=>{

    if(id){
        const category=await Category.findOne({_id:id,status:true});
        
        if(!category){
            throw new Error(`Categoria con id (${id}) no existe`);
        }
    }

}

/**
 * 
 * @param {String} id 
 */
 const existsProductById=async (id )=>{

    if(id){
        const product=await Product.findOne({_id:id,status:true});
        
        if(!product){
            throw new Error(`Producto con id (${id}) no existe`);
        }
    }

}

const validCollection= async(collection='',collections=[])=>{
    if(!collections.includes(collection)){
        throw new Error(`Debe indicar una de las siguientes colecciones : ${collections}`);
    }
    return true;
}

module.exports={
    isValidRole,
    existsEmail,
    existsUserById,
    existsCategory,
    existsCetagoryById,
    existsProductById,
    validCollection
}