const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  GOOGLE_LOGIN: '/auth/google',
  GOOGLE_LOGIN_CALLBACK: '/auth/google/callback',
  MY_VOTINGS: '/my-votings',
  LOGOUT: '/logout',
  VOTINGS_HOME: '/votings',
  VOTINGS_BY_ID: '/votings/:id',
  VOTINGS_NEW: '/votings/new',
  VOTINGS_SUCCESS: '/votings/success',
  VOTINGS_ERROR: '/votings/error',
  VOTINGS: {
    BY_ID: '/:id',
    NEW: '/new',
    SUCCESS: '/success',
    ERROR: '/error',
  },
};

module.exports = ROUTES;
