const dotenv = require('dotenv');
const path = require('path');

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const rootDir = path.join(__dirname, '..');

const databaseURL = process.env.MONGODB_URI;
const mongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const logs = {
  level: process.env.LOG_LEVEL || 'dev',
};

const sass = {
  src: path.join(rootDir, 'assets'),
  dest: path.join(rootDir, 'public'),
  indentedSyntax: false,
  outputStyle: 'compressed',
};

const session = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
};

const googleAuth = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email'],
};

const helmet = {
  contentSecurityPolicy: {
    referrerPolicy: false,
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'https:'],
      'style-src': ["'self'", 'https:'],
      'font-src': ["'self'", 'https:'],
    },
  },
};

module.exports = {
  rootDir,
  databaseURL,
  mongoose,
  logs,
  sass,
  session,
  googleAuth,
  helmet,
};
