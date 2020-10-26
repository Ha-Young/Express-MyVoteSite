const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const user = require('./routes/user');
require('./loaders/db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use('/', user);

app.use((err, req, res, next) => {
  console.log('Global error', err);
});

module.exports = app;
