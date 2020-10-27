const express = require('express');
const votingsController = require('./controllers/votings.controller');

const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const router = express.Router();

router.get('/new', verifyUser, votingsController.getNewVote);
router.post('/new', verifyUser, votingsController.postNewVote);
router.get('/delete', verifyUser, votingsController.deleteVote);
router.get('/:id', votingsController.getVote);
router.post('/:id', verifyUser, votingsController.postVote);

module.exports = router;
