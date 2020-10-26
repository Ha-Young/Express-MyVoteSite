require('dotenv').config();
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const rootDir = path.join(__dirname, '..');

const config = {
  rootDir,
  logs: {
    level: process.env.LOG_LEVEL || 'dev',
  },
  sass: {
    src: path.join(rootDir, 'assets'),
    dest: path.join(rootDir, 'public'),
    indentedSyntax: false,
    outputStyle: 'compressed',
  },
  session: {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  },
  databaseURL: process.env.MONGODB_URI,
  mongoose: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
  },
};

module.exports = config;
