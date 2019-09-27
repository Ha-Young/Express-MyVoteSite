const router = require('express').Router();
const { handleGetHomepage } = require('../controllers/homepage.controller');
const { ensureAuthenticated } = require('../config/authentication');

router.get('/', ensureAuthenticated, handleGetHomepage);

module.exports = router;
