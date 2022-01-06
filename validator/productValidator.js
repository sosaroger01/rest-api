const { checkSchema } = require('express-validator');
const { existsCetagoryById,existsProductById } = require('../helpers/rules');

/**
 * Schema creado para validar el request de crear productos
 */
const storeValidator=checkSchema({
    name:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo nombre es obligatorio"
        },
    },
    price:{
        isNumeric:{
            bail: true,
            errorMessage:"El campo precio debe tener un valor númerico"
        },
    },
    category:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsCetagoryById
        }
    },
    description:{
        notEmpty:{
            bail: true,
            errorMessage:"El campo descripcion es obligatorio"
        },  
    }
});

/**
 * Schema creado para validar el request para listar productos
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
 * Schema creado para validar el request de ver producto
 */

 const showValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsProductById
        }
    },
});

/**
 * Schema creado para validar el request de eliminar productos
 */

 const deleteValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsProductById
        }
    },
});


/**
 * Schema creado para validar el request de modificar productos
 */
 const updateValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        },
        custom:{
            options:existsProductById
        }
    },
    category:{
        custom:{
            options:existsCetagoryById
        }
    },
});

module.exports={
    storeValidator,
    getValidator,
    showValidator,
    deleteValidator,
    updateValidator
}