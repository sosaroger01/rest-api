const { checkSchema } = require('express-validator');
const { validCollection } = require('../helpers/rules');


/**
 * Schema creado para validar el request de modificar categorias
 */
const updateValidator= checkSchema({
    id:{
        isMongoId:{
            bail: true,
            errorMessage:"No es un id válido"
        }
    },
    collection:{
        notEmpty:{
            bail: true,
            errorMessage:"La coleccion es obligatoria"
        },
        custom:{
            options:collection=>validCollection(collection,["product","user"])
        }
    }
});



module.exports={
    updateValidator,
}