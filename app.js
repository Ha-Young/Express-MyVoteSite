var dotenv = require('dotenv');
dotenv.config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var votings = require('./routes/votings');
var myVotings = require('./routes/my-votings');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var User = require("./models/User");
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser('keyboard cat'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.MYSECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use('signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
},  function (req, id, password, done) {
      User.findOne({ id: id }, function (err, user) {
        if (err) return done(null);
        const newUser = new User();
        newUser.id = id;
        newUser.password = newUser.generateHash(password);

        newUser.save(function (err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    )
}));

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
},  function (req, id, password, done) {
      User.findOne({ id: id }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.validPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
));

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signup);
app.use('/login', login);
app.use('/votings', votings);
app.use('/my-votings', myVotings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
