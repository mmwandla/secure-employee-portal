const { check, validationResult } = require('express-validator');

//regex (regular expression) for input whitelisting

//const fullNamePattern = /^[a-zA-Z\s]+$/; //only letters and spaces allowed
//const idNumberPattern = /^\d{13}$/; //only 13 digits allowed
const accountNumberPattern = /^\d{6,}$/; //only digits, minimum 6 digits
const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]+$/; //letters, digits, and certain special characters
//const currencyPattern = /^[A-Z]{3}$/; //3 uppercase letters for currency, e.g., ZAR, USD, EUR
//const providerPattern = /^[a-zA-Z\s]+$/; //only letters and spaces allowed
//const swiftCodePattern = /^[A-Za-z0-9]{8,11}$/; //8 to 11 alphanumeric characters

//validate login inputs
const validateLogin = [
  check('accountNumber')
    .not()
    .isEmpty()
    .withMessage('Valid account number is required')
    .matches(accountNumberPattern)
    .withMessage('Account number must contain only digits and be at least 6 digits long'),
  
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 or more characters')
    .matches(passwordPattern)
    .withMessage('Password can only contain letters, digits, and !@#$%^&*'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateLogin };
