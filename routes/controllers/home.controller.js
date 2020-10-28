const Voting = require('../../models/Voting');

exports.getVotings = async (req, res, next) => {
  try {
    const votingList = await Voting.find();
    // if (username) {
    //   return res.render('home', {
    //     message: '투표를 등록하세요',
    //     loggedInUsername: username,
    //     votingList
    //   });
    // }

    return res.render('home', {
      message: '투표를 등록하세요',
      votingList
    });
  } catch (err) {
    return next(err);
  }
};
