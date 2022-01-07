const {Router}=require("express");
const { uploadFile, updateFile, showFile } = require("../controllers/uploadController");
const { isAuthenticated, validateRequest, validateFile} = require("../middlewares");
const { updateValidator } = require("../validator/uploadValidator");

const router=Router();

router.post("/",[isAuthenticated,validateFile],uploadFile);

router.get("/:collection/:id",[
    updateValidator,
    validateRequest
],showFile);


router.put("/:collection/:id",[
    validateFile,
    updateValidator,
    validateRequest
],updateFile);

module.exports=router;