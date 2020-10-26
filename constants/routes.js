const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  GOOGLE_LOGIN: '/auth/google',
  GOOGLE_LOGIN_CALLBACK: '/auth/google/callback',
  MY_VOTINGS: '/my-votings',
  LOGOUT: '/logout',
  VOTINGS: '/votings',
  VOTINGS: {
    BY_ID: '/:id',
    NEW: '/new',
    SUCCESS: '/success',
    ERROR: '/error',
  },
};

module.exports = ROUTES;
