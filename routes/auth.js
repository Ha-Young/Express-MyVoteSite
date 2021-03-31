const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const { signupSchema } = require('../middlewares/validateInput');
// TODO post 맞냐?? form 데이터는 post메소드일때만 넘어가나??
// TODO login input data also need validation.
router.post('/login', controller.login);

router.post('/register', signupSchema, controller.register);

module.exports = router;
