const express = require('express');
const { loginUser } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validateInput');

const router = express.Router();

//login Route
router.post('/login', validateLogin, loginUser); 

module.exports = router;
