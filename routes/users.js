const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersController = require('../controller/users.controller');

router.get('/login', usersController.getLogin);
router.post('/login', usersController.authLocal, usersController.authLocalRedirect);
router.get('/logout', usersController.getLogout);
router.get('/new', usersController.getNewUser);
router.post('/new', [
  check('email')
    .notEmpty()
    .withMessage('Please fill out the email.')
    .isEmail()
    .withMessage('Please fill it out in e-mail format.'),
  check('password')
    .notEmpty()
    .withMessage('Please fill out the password.')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/)
    .withMessage('Passwords are 8-15 characters long and must contain one lower case/upper case/numeric character.'),
  check('passwordConfirmation')
    .notEmpty()
    .withMessage('Please fill in the password check box.')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('The passwords you entered is different.'),
], usersController.createNewUser);

module.exports = router;
