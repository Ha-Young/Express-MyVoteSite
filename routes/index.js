var express = require('express');
var router = express.Router();

const authController = require('./controllers/authController');
const votingController = require('./controllers/votingController');

router.get('/', votingController.getAll);

router.get('/register', authController.registerForm);
router.post('/register',
  authController.validateRegister,
  authController.register
);

router.get('/login', authController.loginForm);
router.post('/login',
  authController.validateLogin,
  authController.login
);

router.get('/logout', authController.logout);

router.get('/votings/:id',
  authController.isLoggedIn,
  votingController.getVoting
);
router.put('/votings/:id',
  authController.isLoggedIn,
  votingController.vote
);

router.get('/votings/new',
  votingController.newVotingForm
);
router.post('/votings/new',
  votingController.validateNewVoting,
  votingController.saveNewVoting
);

/*router.get('/votings/success',
  votingController.success
);*/

module.exports = router;
