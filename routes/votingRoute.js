const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votingController');
// const authController = require('../controllers/authController');
// const isLoggedIn = require('../controllers/middleware/isLoggedIn');

router.get('/new', votingController.renderCreateVoting);
router.post('/new', votingController.createNewVoting);

router.get('/my-voting', votingController.renderMyVoting);
router.get('/:id', votingController.renderVoting);

module.exports = router;
