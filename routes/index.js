const router = require('express').Router();
const indexController = require('../controllers/index.controller');

/* GET home page. */
router
  .route('/')
  .get(indexController.getHome);

router
  .route('/my-votings')
  .get(indexController.getMyVotes);

module.exports = router;
