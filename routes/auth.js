const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
// TODO post 맞냐?? form 데이터는 post메소드일때만 넘어가나??
router.post('/login', controller.login);

router.post('/register', controller.register);

module.exports = router;
