const express = require('express');
const { getPayments, updatePaymentStatus } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

//get list of payments route
router.get('/list', auth, getPayments);

//update payment status
router.put('/update-status/:id', auth, updatePaymentStatus);

module.exports = router;
