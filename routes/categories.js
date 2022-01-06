const {Router} = require("express");

const { get, update, store,destroy,show } = require("../controllers/categoriesController");

const { isAuthenticated,isAdminRole,validateRequest} = require("../middlewares");
const { storeValidator, getValidator , updateValidator, deleteValidator, showValidator } = require("../validator/categoryValidator");

const router=Router();


router.get('/',[
    isAuthenticated,
    getValidator,
    validateRequest
], get); 

router.get('/:id',[
    showValidator,
    validateRequest
], show); 

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