const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.post('/register-or-updatebook',bookController.createOrUpdateBook);
router.get('/getallorders',bookController.getAllOrders)
router.post('/getbooksbyfilter',bookController.getBooksByFilter);
router.post('/createorupdateorder',bookController.createOrUpdateOrder);
router.post('/createorder',bookController.createOrder)
router.post('/getordersbycustomerid',bookController.getOrderDetailsByCustomerID);
router.get('/gettodayssale',bookController.getTodaysSale);
router.get('/getlast7dayssales',bookController.getLast7DaysSales)
router.post('/updateorderstatus',bookController.updateOrderStatus);

module.exports= router;