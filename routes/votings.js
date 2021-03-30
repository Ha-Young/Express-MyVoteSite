const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('./controllers/votings.controller');

router.get('/new', isLoggedIn, votingsController.get);
router.post('/new', isLoggedIn, votingsController.post);
router.get('/:id');
router.get('/success');
router.get('/error');

module.exports = router;
