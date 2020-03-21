require('dotenv').config();

const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const signup = require('./routes/signup');
const login = require('./routes/login');
const votings = require('./routes/votings');

const app = express();

require('./config/mongoose');
require('./config/passport');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "nathaneat",
    store: new MongoStore({ 
      url : process.env.MONGODB_URI
    }),
    store: new MongoStore({ url : process.env.MONGODB_URI }),
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/votings', votings);

app.use(function (req, res, next) {
  next(createError({
    status: 404,
    message: '존재하지 않는 페이지 입니다'
  }));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
