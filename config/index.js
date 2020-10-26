const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  databaseURL: process.env.MONGODB_URI,
  logs: {
    level: process.env.LOG_LEVEL || 'dev',
  },
};

module.exports = config;
