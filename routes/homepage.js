const router = require('express').Router();
const { ensureAuthenticated } = require('../config/authentication');
const { handleGetHomepage } = require('../controllers/homepage.controller');

router.get('/', ensureAuthenticated, handleGetHomepage);

module.exports = router;
