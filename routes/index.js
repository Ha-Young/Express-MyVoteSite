const express = require('express');
const router = express.Router();

const homeControllers = require('./controllers/home.Controllers');

router.get('/', homeControllers.home);
router.get('/logout', homeControllers.logout);
router.get('/my-votings', homeControllers.myVotings);

module.exports = router;
