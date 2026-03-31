const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser } = require('../controllers/registerController');

router.post('/register', [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email'),

  body('phone')
    .optional()
    .isMobilePhone().withMessage('Enter a valid phone number'),

  body('rollNumber')
    .optional()
    .isLength({ max: 20 }).withMessage('Roll number too long'),
], registerUser);

module.exports = router;