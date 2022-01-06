const { checkSchema } = require('express-validator');
const {  existsCategory, existsCetagoryById } = require('../helpers/rules');

/**
 * Schema creado para validar el request de crear categorias
 */
const storeValidator=checkSchema({
    name:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo nombre es obligatorio"
        },
        custom:{
            options:existsCategory
        }
    }
});

/**
 * Schema creado para validar el request para listar categorias
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
 * Schema creado para validar el request de modificar categorias
 */
const updateValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsCetagoryById
        }
    },
    name:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo nombre es obligatorio"
        }
    }
});

/**
 * Schema creado para validar el request de eliminar categorias
 */

 const deleteValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsCetagoryById
        }
    },
});

/**
 * Schema creado para validar el request de ver categoria
 */

 const showValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsCetagoryById
        }
    },
});

module.exports={
    storeValidator,
    getValidator,
    updateValidator,
    deleteValidator,
    showValidator
}