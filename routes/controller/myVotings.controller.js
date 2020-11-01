const User = require('../../models/User');
const Vote = require('../../models/Vote');

const { getOneUserData } = require('../../services/User');
const { getAllVoteData } = require('../../services/Vote');

const renderMyVotings = async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const userId = isLoggedIn ? req.session.passport.user._id : undefined;

    const userInfo = await getOneUserData(userId);
    const allVotesInfo = await getAllVoteData();

    const voteMadeByUser = [];

    allVotesInfo.forEach((vote) => {
      if (vote.author.objectIdInDB.equals(userInfo._id)) {
        voteMadeByUser.push(vote);
      }
    });

    res.render('myVotings', {
      isLoggedIn: isLoggedIn,
      user: userInfo,
      voteMadeByUser: voteMadeByUser
    });
  } catch (err) {
    next(err);
  }
};

module.exports = renderMyVotings;
