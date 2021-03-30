const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config();

module.exports = {
  port: normalizePort(process.env.PORT || '3000'),
  databaseURI: process.env.DATABASE_URI,
  databasePassword: process.env.DATABASE_PASSWORD,
  sessionSecret: process.env.SESSION_SECRET,
  salt: Number(process.env.SALT),
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackURL: process.env.GITHUB_CALLBACK_URL,
};

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
