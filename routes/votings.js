const express = require('express');
const votingController = require('../controller/votings.controller');

const router = express.Router();

router.get('/', votingController.getAll);
router.get('/new', votingController.showForm);
router.post('/new', votingController.create);
router.get('/:id', votingController.getOne);

module.exports = router;
