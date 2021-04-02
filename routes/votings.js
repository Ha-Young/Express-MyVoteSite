const express = require('express');
const votingController = require('../controller/votings.controller');
const { authCheck } = require('../middlewares/authCheck');

const router = express.Router();

router.get('/new', authCheck, votingController.showForm);
router.post('/new', authCheck, votingController.create);
router.post('/update/:id', authCheck, votingController.updateVoting);
router.get('/delete/:id', authCheck, votingController.deleteVoting);
// router.get('/success', votingController.result);
// router.get('/error', votingController.result);
router.get('/:id', votingController.getOne);

module.exports = router;
