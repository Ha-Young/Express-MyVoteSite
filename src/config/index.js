const dotenv = require("dotenv");

// Set the NODE_ENV to "development" by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

dotenv.config();

module.exports = {
  rootURL: "http://localhost:3000",
  port: normalizePort(process.env.PORT || "3000"),
  databaseURL: process.env.MONGODB_URI,
  dateFormat: "yyyy-MM-dd hh:mm:ss",

  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtCookieKey: "VC_wpAthtk",
    jwtExpires: 60 * 60 * 1000,
  },

  google: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET,
  },
};

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
