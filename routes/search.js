const {Router}=require("express");
const { search } = require("../controllers/searchController");
const { isAuthenticated} = require("../middlewares");

const router=Router();

router.get('/:collection/:term',[isAuthenticated],search);



module.exports=router;