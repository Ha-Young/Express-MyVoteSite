const express = require('express');
const authenticateLogin = require('express');
const myVotingControl = require('./controllers/my-votings.controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(3333333333333333333333333333)
});

module.exports = router;
