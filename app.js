const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const index = require('./routes/index');
const signup = require('./routes/signup');
const login = require('./routes/login');
const votings = require('./routes/votings');

const app = express();

require('./config/mongoose');
require('./config/passport');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//FIXME: 시크릿 env 파일에 넣기
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "nathaneat",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/votings', votings);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
