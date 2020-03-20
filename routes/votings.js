const express = require('express');
const router = express.Router();
const checkUser = require('../middlewares/checkUser');
const votingController = require('../controllers/voting.controller');

router.get('/new', checkUser, votingController.getCreationPage);
router.get('/:id', votingController.getDetail);
router.post('/new', checkUser, votingController.create);
router.put('/:votingId/options/:optionId', checkUser, votingController.update);
router.delete('/:id', checkUser, votingController.remove);

module.exports = router;
