const express = require('express');

const controller = require('../../controller');
const validateSignupForm = require('../../middleware/validateSignupForm');
const saveUser = require('../../middleware/saveUser');
const saveSession = require('../../middleware/saveSession');
const bcryptPassword = require('../../middleware/bcryptPassword');

const router = express.Router();

router.get('/', controller.render('./signup'));
router.post('/', validateSignupForm, bcryptPassword, saveUser, saveSession, controller.redirect('index'));
router.get('/success', controller.redirect('./signup/success'));

module.exports = router;
