exports.ROUTER = {
  HOME: '/',
  AUTH: '/auth',
  VOTINGS: '/votings'
};

exports.ROUTES = {
  SIGNUP: '/signup',
  LOGIN: '/login',
  MY_VOTINGS: '/my-votings',
  ID: '/:id',
  NEW: '/new',
  SUCCESS: '/success',
  ERROR: '/error'
};

// WILL BE UPDATED
const AUTH_ERROR_CODE = {
  EA_0: {
    value: 'EA_0',
    message: 'The user already exists'
  },
  EA_1: {
    value: 'EA_1',
    message: 'No user exists'
  },
  EA_2: {
    value: 'EA_2',
    message: `Passwords don't match`
  }
};
