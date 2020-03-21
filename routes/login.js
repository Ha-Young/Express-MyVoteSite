const express = require('express');
const router = express.Router();

const loginControllers = require('./controllers/login.Controllers');

router.get('/', (req, res) => res.render('login'));
router.post('/', loginControllers.validation);

module.exports = router;
