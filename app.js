const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const compression = require('compression');
const createError = require('http-errors');

const app = express();

const config = require('./config');

const index = require('./routes/index');
const auth = require('./routes/auth');
const votings = require('./routes/votings');
const handleGlobalError = require('./middlewares/handleGlobalError');

const databaseURL = config.databaseURI.replace(
  '<password>',
  config.databasePassword
);

const clientPromise = mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(m => m.connection.getClient());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(compression());
app.use(express.static('public'));
app.use(express.static(`${__dirname}/node_modules/chart.js/dist/`))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: config.sessionSecret,
  store: MongoStore.create({
    clientPromise,
  }),
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
  }
}));
app.use(flash());

require('./auth/passport')(app);

app.use('/', index);
app.use('/auth', auth);
app.use('/votings', votings);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, `Can't find ${req.originalUrl} on this server`));
});

// error handler
app.use(handleGlobalError);

module.exports = app;
