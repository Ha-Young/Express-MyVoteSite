require('dotenv').config();
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const rootDir = path.join(__dirname, '..');

const config = {
  rootDir,
  databaseURL: process.env.MONGODB_URI,
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
};

module.exports = config;