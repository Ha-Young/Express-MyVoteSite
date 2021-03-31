const router = require('express').Router();

const indexController = require('../controllers/index.controller');
const authenticationHandler = require('../middlewares/authenticationHandler');
const validationHandler = require('../middlewares/validationHandler');

/* GET home page. */
router
  .route('/')
  .get(validationHandler.query, indexController.getHome);

router
  .route('/my-votings')
  .get(validationHandler.query, authenticationHandler.index, indexController.getMyVotes);

module.exports = router;
