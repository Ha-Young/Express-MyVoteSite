const express = require('express');
const votingsController = require('./controllers/votings.controller');

const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const router = express.Router();

router.get('/new', verifyUser, votingsController.getNewVote);
router.post('/new', verifyUser, votingsController.postNewVote);
router.get('/:id', votingsController.getVote);
router.post('/:id', verifyUser, votingsController.postVote);
router.get('/delete/:id', verifyUser, votingsController.deleteVote);

module.exports = router;
