const { checkSchema } = require('express-validator');
const { existsEmail, isValidRole, existsUserById } = require('../helpers/rules');

/**
 * Schema creado para validar el request para guardar usuarios
 */
const storeValidator=checkSchema({
    name:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo name es obligatorio"
        },
    },
    password:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo password es obligatorio"
        },
        isLength: {
            errorMessage: 'Debe tener por lo menos 6 caracteres',
            options: { min: 6 },
        },
    },
    email:{
        isEmail:{
            bail: true,
            errorMessage:"El campo email debe ser un correo valido"
        },
        custom:{
            options:existsEmail
        }
    },
    role:{
        custom:{
            options:isValidRole
        }
    }
});

/**
 * Schema creado para validar el request para editar usuarios
 */
const updateValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsUserById
        }
    },
    role:{
        custom:{
            options:isValidRole
        }
    }
});

/**
 * Schema creado para validar el request para listar usuarios
 */
const getValidator= checkSchema({
    limit:{
        customSanitizer: {
            options: (value, { req, location, path }) => {
                const defaulValue=5;

                if(!value){
                    req.query.limit=defaulValue;
                    return;
                }
                value=Number(value);
                return Number.isInteger(value) ? value : defaulValue;
            },
        },
    },
    page:{
        customSanitizer: {
            options: (value, { req, location, path }) => {
                const defaulValue=1;

                if(!value){
                    return req.query.page=defaulValue;
                }

                value=Number(value);
                return Number.isInteger(value) ? value : defaulValue;
            },
        },
    }
});

/**
 * Schema creado para validar el request para eliminar usuarios
 */
 const deleteValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsUserById
        }
    }
});

module.exports={
    storeValidator,
    updateValidator,
    getValidator,
    deleteValidator
}