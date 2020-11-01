const SERVICE_ERROR = {
  CODE_00: {
    code: '00',
    value: 'auth',
    message: 'The user already exists'
  },
  CODE_01: {
    code: '01',
    value: 'auth',
    message: 'No user exists'
  },
  CODE_02: {
    code: '02',
    value: 'auth',
    message: `Passwords mismatch`
  },
  CODE_10: {
    code: '10',
    value: 'vote',
    message: 'Cannot found the vote'
  },
  CODE_11: {
    code: '11',
    value: 'vote',
    message: 'The vote is expired'
  }
};

exports.SERVICE_ERROR_CODE = {
  _00: 'error-00',
  _01: 'error-01',
  _02: 'error-02',
  _10: 'error-10',
  _11: 'error-11'
};

exports.createAction = function createAction(status, payload) {
  if (status === 'error') {
    return { status: `error-${payload}`, payload: SERVICE_ERROR[`CODE_${payload}`] };
  }
  return { status, payload };
};
