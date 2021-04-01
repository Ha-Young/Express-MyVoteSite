const Voting = require('../models/Voting');
const User = require('../models/User');

exports.getLoginPage = async function (req, res, next) {
  res.render('login');
};
