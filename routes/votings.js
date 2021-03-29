const express = require('express');
const router = express.Router();
// const votingController = require('./controllers/voting.controller');
const { verifyUser } = require('../middlewares/verifyUser');

router.get('/new', verifyUser);
router.get('/success', verifyUser);
router.get('/error', verifyUser);
router.get('/:id');

module.exports = router;
