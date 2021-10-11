const {Router} = require("express");

const { get, update, store,destroy } = require("../controllers/userController");

const { isAuthenticated,hasRole,isAdminRole,validateRequest} = require("../middlewares");

const { storeValidator,updateValidator,getValidator,deleteValidator } = require("../validator/userValidator");


const router=Router();

router.get('/',[
    isAuthenticated,
    hasRole('ADMIN_ROLE','SALES_ROLE','USER_ROLE'),
    getValidator,
    validateRequest
], get); 

router.put('/:id', [
    isAuthenticated,
    updateValidator,
    validateRequest
], update);

router.post('/',[
    isAuthenticated,
    storeValidator,
    validateRequest
], store); 

router.delete('/:id', [
    isAuthenticated,
    isAdminRole,
    deleteValidator,
    validateRequest
],destroy); 


module.exports=router;