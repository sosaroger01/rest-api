const {Router} = require("express");

const { get, update, store,destroy } = require("../controllers/userController");

const router=Router();

router.get('/', get); 

router.put('/:id', update);

router.post('/', store); 

router.delete('/', destroy); 


module.exports=router;