const router = require('express').Router();

const { getHome, getMyVotes } = require('../controllers/index.controller');
const { authenticateIndex } = require('../middlewares/authenticationHandler');
const { validateQuery } = require('../middlewares/validationHandler');

/* GET home page. */
router
  .route('/')
  .get(validateQuery, getHome);

router
  .route('/my-votings')
  .get(validateQuery, authenticateIndex, getMyVotes);

module.exports = router;
