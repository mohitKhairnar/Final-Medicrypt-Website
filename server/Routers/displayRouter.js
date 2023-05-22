const router = require('express').Router();
const displayController=require('../Controllers/displayController');


// router.post('/',displayController.detailsSave);
router.get('/:id',displayController.detailsFetch);
module.exports=router;
