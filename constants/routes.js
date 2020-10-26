const HOME = '/';
const SIGNUP = '/signup';
const LOGIN = '/login';
const LOGOUT = '/logout';

const VOTINGS = '/votings';
const VOTINGS_DETAIL = '/:id';
const MY_VOTINGS = '/my-votings';
const NEW = '/new';
const SUCCESS = '/success';
const FAILURE = '/failure';

const routes = {
  home: HOME,
  signup: SIGNUP,
  login: LOGIN,
  logout: LOGOUT,
  votings: VOTINGS,
  votingsDetail: VOTINGS_DETAIL,
  myVotings: MY_VOTINGS,
  new: NEW,
  success: SUCCESS,
  failure: FAILURE,
};

module.exports = routes;
