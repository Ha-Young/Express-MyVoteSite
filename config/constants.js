exports.SUCCESS = 'success';
exports.ERROR = 'error';
exports.CALLBACK_URI = 'callbackURI';

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
