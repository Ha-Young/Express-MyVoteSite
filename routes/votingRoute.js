const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votingController');
// const authController = require('../controllers/authController');
// const isLoggedIn = require('../controllers/middleware/isLoggedIn');

router.get('/', (req, res, next) => {
  res.send('votings')
});

router.get('/new', votingController.renderCreateVoting);
router.post('/new', votingController.createNewVoting);
// router.post('/new', (req, res, next) => {
//   console.log(req.body)
//   res.send('1234 answer')
// });

module.exports = router;
