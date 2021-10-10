const {Router} = require("express");
const { check } = require("express-validator");

const { get, update, store,destroy } = require("../controllers/userController");
const { isValidRole, existsEmail } = require("../helpers/rules");
const { validateRequest } = require("../middlewares/validateRequest");
const { storeValidator,updateValidator,getValidator,deleteValidator } = require("../validator/userValidator");


const router=Router();

router.get('/',[
    getValidator,
    validateRequest
], get); 

router.put('/:id', [
    updateValidator,
    validateRequest
], update);

router.post('/',[
    storeValidator,
    validateRequest
], store); 

router.delete('/:id', [
    deleteValidator,
    validateRequest
],destroy); 


module.exports=router;