const express = require('express');
const router = express.Router();
const votingControllers = require('../controllers/voting.controllers');

router.get('/',
  votingControllers.updateExpired,
  votingControllers.getAll,
  async (req, res, next) => {
    const { votings } = res.locals;
    let isUser = req.user ? true : false;

    votings.forEach(voting => {
      voting.author = voting.createdBy.username;
    });

    res.render('index', { votings, isUser });
  });

module.exports = router;
