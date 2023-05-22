const router = require('express').Router();
const detailsController=require('../Controllers/detailsController');


router.post('/',detailsController.detailsSave);
router.get('/',detailsController.detailsFetch);
module.exports=router;
