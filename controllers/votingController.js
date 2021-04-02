const Voting = require("../models/Voting");
const User = require("../models/User");
const { format } = require("date-fns");

exports.postNewVoting = async function (req, res, next) {
  try {
    console.log(req.body)
    const { title, expireDate, options } = req.body;
    const { _id } = req.user;

    const votingOptionFormat = options.map(option => {
      console.log(option, "??")
      return { title: option }
    });

    const newVoting = await Voting.create({
      title: title,
      author: _id,
      expireDate: expireDate,
      options: votingOptionFormat,
    });

    await User.findByIdAndUpdate(
      { _id },
      { $push: { votingsCreatedByMe: newVoting._id } }
    );

    req.flash("messages", { message: "Registered your voting successfully!" });
    res.redirect("/votings/new");
  } catch (error) {
    next(error);
  }
};

exports.getSelectedVoting = async function (req, res, next) {
  try {
    const { params, user } = req;
    // console.log(req.body, req.params, req.user)
    const isLoggedIn = req.user ? true : false;
    const { title, author, options, expireDate, isProceeding, winner } = await Voting.findById(params.id).populate("author").lean();
    //const selectedVoting = await Voting.findById(params.id).populate("author").lean();
    //console.log(selectedVoting, "???")
    const isAuthor = isLoggedIn && String(author._id) === String(user._id);

    const votingOptionFormat = options.map(option => {
      const { _id, title, voters } = option;

      return {
        _id: _id,
        title: title,
        voters: voters,
      }
    });

    console.log(votingOptionFormat, "@?@?$")
  // const checkProceeding = checkExpireDate(expireDate)
    const votingDetailFormat = {
      title: title,
      author: author.userName,
      contact: author.email,
      expireDate: format(expireDate, "yyyy/MM/dd"),
      isProceeding: isProceeding,
      winner: winner
    };

    res.render("voting",
      { title: "Voting", votingDetailFormat, votingOptionFormat, isAuthor, isLoggedIn, messages: req.flash("messages") }
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async function (req, res, next) {
  try {
    const votingId = req.params.id;

    await Voting.findByIdAndDelete(votingId);

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { votingsCreatedByMe: { $in: [votingId] }, myVotingList: { $in: [votingId] } }},
      { new: true },
    );

    res.status(200).json({ result: "ok" });

    // res.end();
  } catch (error) {
    next(error);
  }
};

// votingsCreatedByMe: { $in: [votingId] }, 
exports.updateVoting = async function (req, res, next) {
  try {
    console.log(req.body, "??????!?!?!@$?#%$%")

    const { votingId, selectedOptionValue, selectedOptionId } = req.body;
    const userId = req.user._id;

    console.log(votingId, selectedOptionValue, selectedOptionId, userId, "~~~~~~~~~~")


    const userVotingList = await User.findById({ _id: userId }).populate("myVotingList").lean();

    const isDuplicatedVoting = userVotingList.myVotingList.find(votingList => String(votingList._id) === String(votingId));

      if (isDuplicatedVoting) {
      res.json("already voted");
      return;
    }

    await Voting.findOneAndUpdate(
      { _id: votingId },
      { $push: { 'options.$[option].voters': userId }},
      { arrayFilters: [{"option._id": selectedOptionId }]}
    );

    await User.findByIdAndUpdate({ _id: userId }, { $push : { myVotingList: votingId }});

    res.json("user exist")
  } catch (error) {
    next(error);
  }
};
