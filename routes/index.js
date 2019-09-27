var express = require('express');
var router = express.Router();

const authController = require('./controllers/authController');
const votingController = require('./controllers/votingController');
const errorController = require('./controllers/errorController');

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

router.get('/votings/new',
  authController.isLoggedIn,
  votingController.newVotingForm
);

router.post('/votings/new',
  votingController.validateNewVoting,
  votingController.saveNewVoting
);

router.get('/votings',
authController.isLoggedIn,
  votingController.getMyVoting
);

router.get('/votings/success',
  votingController.RenderSuccess
);

router.get('/votings/error',
  votingController.RenderError
);

router.get('/votings/:id',
  authController.isLoggedIn,
  votingController.getVoting
);
router.put('/votings/:id',
  authController.isLoggedIn,
  votingController.vote
);
router.delete('/votings/:id',
  authController.isLoggedIn,
  votingController.deleteVoting
);

module.exports = router;
