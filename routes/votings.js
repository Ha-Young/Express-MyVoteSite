const express = require('express');
const votingController = require('../controller/votings.controller');

const router = express.Router();

router.get('/new', votingController.showForm);
router.post('/new', votingController.create);
router.get('/success', votingController.viewSuccess);
router.get('/:id', votingController.getOne);
router.post('/update/:id', votingController.updateVoting);
router.get('/delete/:id', votingController.deleteVoting);

module.exports = router;
