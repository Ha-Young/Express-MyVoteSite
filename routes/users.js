const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const passportLocal = require('../config/passport');
const usersController = require('../controller/users.controller');

router.get('/login', usersController.getLogin);

router.post('/login', 
  passportLocal.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
  (req, res) => {
    if (req.body.referer && (req.body.referer !== undefined && req.body.referer.slice(-6) !== '/login')) {
      res.redirect(req.body.referer);
    } else {
      res.redirect('/');
    }
  });

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
], usersController.makeNewUser);

module.exports = router;
