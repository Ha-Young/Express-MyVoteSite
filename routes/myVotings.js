const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { showMyVotings } = require('../controllers/myVotingsController');

router.get('/', auth, showMyVotings);

module.exports = router;
