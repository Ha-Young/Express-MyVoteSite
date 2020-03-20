const User = require('../models/User');
const { dateFormat } = require('../libs/date');

exports.showMyVotings = async (req, res, next) => {
  try {
    let user = req.user;
    const votings = await User.findOne({ _id: user.id }).populate('created');
    const expiration = [];
    
    user = await User.findOne({ _id: user.id });

    votings.created.forEach(voting => {
      expiration.push(dateFormat(voting.expiration));
    });

    res.render('myVotings', { votings, expiration, user });
  } catch (err) {
    err.status = 500;
    next(err);
  }
};
