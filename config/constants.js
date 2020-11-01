exports.SUCCESS = 'success';
exports.ERROR = 'error';
exports.CALLBACK_URI = 'callbackURI';
exports.HOUR = 3600000;

exports.ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  VOTINGS: '/votings'
};

exports.ROUTE_MAIN = {
  HOME: '/',
  MY_VOTINGS: '/my-votings'
};

exports.ROUTE_AUTH = {
  SIGNUP: '/signup',
  LOGIN: '/login',
  LOGOUT: '/logout'
};

exports.ROUTE_VOTINGS = {
  NEW: '/new',
  ID: '/:id',
  DELETE: '/delete/:id'
};

exports.VIEWS = {
  HOME: 'index',
  MY_VOTINGS: 'myVotings',
  VOTE_DETAIL: 'voteDetail',
  SIGN_UP: 'signUp',
  LOGIN: 'login',
  NEW_VOTE: 'newVote',
  ERROR: 'error'
};

exports.MESSAGES = {
  EMAIL_INVAILD: 'Invaild E-mail input type',
  PASSWORD_MINIMUM_LENGTH: 'Password must be at least 4',
  PASSWORD_CONFIRMATION_MISMATCH: 'Password fields must have the same value',
  SUCCESS_SIGNUP: 'Succeed sign up! Welcome,',
  SUCCESS_LOGIN: 'Succeed Login!',
  SUCCESS_CRAETE_NEW_VOTE: 'Succeed creating new vote!',
  ERROR_CREATE_NEW_VOTE: 'Failed creating item must be at least 2',
  SUCCESS_VOTING: 'Succeed voting!',
  SUCCESS_DELETE_VOTE: 'Succeed delete'
};
