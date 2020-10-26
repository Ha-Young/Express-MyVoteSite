if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const path = require('path');

const router = require('./routes');

const app = express();

require('./config/middleware')(app);
require('./config/database')();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(router);

module.exports = app;
