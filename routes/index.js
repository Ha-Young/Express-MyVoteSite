const express = require('express');

const router = express.Router();
const votingControllers = require('../controllers/voting.controllers');

router.get('/',
  votingControllers.updateExpired,
  votingControllers.getAll,
  async (req, res) => {
    const { votings } = res.locals;
    const isUser = !!req.user;
    res.render('index', { votings, isUser });
  });

module.exports = router;
