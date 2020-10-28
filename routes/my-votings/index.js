const express = require('express');

const controller = require('../../controller');
const { getVotingsUser, } = require('../../middleware');

const router = express.Router();

router.get('/',
  getVotingsUser,
  controller.render('myVotings')
);

module.exports = router;
