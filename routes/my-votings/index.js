const express = require('express');

const controller = require('../../controller');
const getVotingsUser = require('../../middleware/getVotingsUser');

const router = express.Router();

router.get('/',
  getVotingsUser,
  controller.render('my-votings')
);

module.exports = router;
