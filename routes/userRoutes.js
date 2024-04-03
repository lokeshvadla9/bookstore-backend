const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/register-or-update-customer', userController.registerOrUpdateCustomer);
router.post('/forgotpassword',userController.forgotPassword);
router.get('/getallusers',userController.getAllUsers);
router.post('/contactus',userController.postContactUs);
router.get('/getqueries',userController.getAllContactQueries);
router.post('/updatequerystatus',userController.updateQueryStatus);


module.exports = router;
