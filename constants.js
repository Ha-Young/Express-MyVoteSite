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

const ERROR = 'error';
const SUCCESS = 'success';

const AUTH_ERROR_MESSAGE = {
  CODE_0: {
    code: '0',
    value: 'auth',
    message: 'The user already exists'
  },
  CODE_1: {
    code: '1',
    value: 'auth',
    message: 'No user exists'
  },
  CODE_2: {
    code: '2',
    value: 'auth',
    message: `Passwords don't match`
  },
  CODE_0: {
    code: '0',
    value: 'vote',
    message: 'Cannot found the vote'
  },
  CODE_1: {
    code: '1',
    value: 'vote',
    message: 'The vote is expired'
  }
};

const VOTE_ERROR_MESSAGE = {
  CODE_0: {
    code: '0',
    message: 'Cannot found the vote'
  },
  CODE_1: {
    code: '1',
    message: 'The vote is expired'
  }
};
