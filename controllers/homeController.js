const { findByIdAndUpdate } = require("../models/Voting");
const Voting = require("../models/Voting");

function checkExpireDate(expireDate) {
  const today = new Date();
  const votingExpireDate = new Date(expireDate);
  return today <= votingExpireDate;
}

function getMaxVoterCount (votingOptions) {
  let max = 0;

  votingOptions.forEach(option => {
    if (option.voters.length > max) {
      max = option.voters.length;
    }
  })

  return max;
}

exports.getVotings = async function (req, res, next) {
  try {
    const displayName = req.user ? req.user.userName : null;
    const votings = await Voting.find().populate("author").lean();

    const homeVotingDisplayList = votings.map(voting => {
     const isProceeding = checkExpireDate(voting.expireDate);
     const winner = [];

      if (!isProceeding) {
        const maxCount = getMaxVoterCount(voting.options);

        voting.options.forEach(option => {
          if (option.voters.length >= maxCount) {
            winner.push(option.optionTitle);
          }
        });

      }

      return {
        _id: voting._id,
        title: voting.title,
        author: voting.author.userName,
        authorEmail: voting.author.email,
        expireDate: voting.expireDate,
        isProceeding: isProceeding,
        winner: winner,
      }

    })
    console.log(homeVotingDisplayList, "????")

   // await Voting.({_id: voting._id}, { isProceeding: isProceeding, winner: winner})

    res.render("index",
      { title: "Home", displayName, homeVotingDisplayList, error: req.flash("error") }
    );

  } catch (error) {
    next(error)
  }
}

// expiration -> winner -> rendering

// exports.getVotings = async function(req, res, next) {
//   try {
//   //   const displayName = req.user ? req.user.userName : null;
//   //   const votings = await Voting.find().populate("author");

//   //   const homeVotingDisplayList = votings.map( voting => {
//   //   // 듀데이트 인증하는거 유틸로 빼기
//   //     const today = new Date();
//   //     const votingDueDate = new Date(voting.expireDate);
//   //     const isProceeding = today < votingDueDate;

//   //     if (!isProceeding) {
//   //       const votingOptions = voting.votingOptions
//   //       let max = 0;
//   //       let winner = null;

//   //       votingOptions.map(option => {
//   //         if (option.voters.length > max) {
//   //           max = option.voters.length;
//   //           winner = option.optionTitle;
//   //         }
//   //     });

//   //     console.log(max, winner, "options");
//   //       await Voting.findByIdAndUpdate({ _id: voting._id }, { votingWinner: String(winner), isProceeding: isProceeding });
//   //     }

//   //     return {
//   //       _id: voting._id,
//   //       title: voting.title,
//   //       author: voting.author.userName,
//   //       authorEmail: voting.author.email,
//   //       expireDate: voting.expireDate,
//   //       // isProceeding: isProceeding,
//   //       // votingWinner: voting.votingWinner,
//   //     };
//   //   });
//   //   //console.log(homeVotingDisplayList, "home")
//   //   res.render("index",
//   //     { title: "Home", displayName, homeVotingDisplayList, error: req.flash("error") }
//   //   );
//   } catch (error) {
//     next(error);
// };

