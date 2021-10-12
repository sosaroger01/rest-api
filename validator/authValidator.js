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

/**
 * Schema creado para validar el request de autenticacion con google
 */
const googleValidator=checkSchema({
    token:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo token es obligatorio"
        }
    }
});


module.exports={
    loginValidator,
    googleValidator
}