const Voting = require('../../models/Voting');

exports.showVotings = async (req, res, next) => {
  return res.render('home', {
    message: '투표를 등록하세요'
  });
  // try {
  //   const votingList = await Voting.find();

  //   if (!votingList) {
  //     return res.render('home', {
  //       message: '투표를 등록하세요.'
  //     });
  //   }

  //   // return res.render('home', votingList);
  // } catch (err) {
  //   console.log(err);
  // }
};
