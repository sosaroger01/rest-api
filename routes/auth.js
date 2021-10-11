const {Router} = require("express");

const { login } = require("../controllers/authController");
const { validateRequest } = require("../middlewares/validateRequest");
const { loginValidator } = require("../validator/authValidator");

const router=Router();

router.post('/login',[
    loginValidator,
    validateRequest
] ,login); 

module.exports=router;