const { Router } = require('express');
const auth = require('./auth');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  auth(app);

  return app;
};
