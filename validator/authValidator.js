const { checkSchema } = require('express-validator');

/**
 * Schema creado para validar el request de autenticacion
 */
const loginValidator=checkSchema({
    password:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo password es obligatorio"
        }
    },
    email:{
        isEmail:{
            bail: true,
            errorMessage:"El campo email debe ser un correo válido"
        }
    }
});


module.exports={
    loginValidator
}