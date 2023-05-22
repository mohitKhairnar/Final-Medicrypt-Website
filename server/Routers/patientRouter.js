const router = require('express').Router();
const patientController = require('../Controllers/patientController');
const requireUser = require('../Middlewares/requireUser')
router.get('/all',requireUser,patientController.getAllPatientController);
router.post('/',requireUser,patientController.createPatientController);

module.exports = router; 