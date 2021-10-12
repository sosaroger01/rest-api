const {Router} = require("express");

const { login,googleSignIn } = require("../controllers/authController");
const { validateRequest } = require("../middlewares/validateRequest");
const { loginValidator, googleValidator } = require("../validator/authValidator");

const router=Router();

router.post('/login',[
    loginValidator,
    validateRequest
] ,login); 


router.post('/google',[
    googleValidator,
    validateRequest
] ,googleSignIn); 

module.exports=router;