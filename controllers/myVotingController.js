const Voting = require("../models/Voting");
const User = require("../models/User");

exports.getMyVotings = async function(req, res, next) {
  const displayName = req.user ? req.user.userName : null;

  const myVotings = await User.findById(req.user._id).populate("votingsCreatedByMe").exec();
  console.log(myVotings, "???");

//   const myVotingFormat = {
//     title: myVoting.title,
//     expireDate: myVoting.
//   }

  const myVotingFormats = myVotings.votingsCreatedByMe.map(myVoting => ({
    _id: myVoting._id,
    title: myVoting.title,
    expireDate: myVoting.expireDate,
    isProceeding: !myVoting.isExpired,
  }));

  console.log(myVotingFormats)


  res.render('myVotings', { title: 'My Votings', displayName, myVotingFormats });
}
