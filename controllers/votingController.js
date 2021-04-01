const Voting = require("../models/Voting");
const User = require("../models/User");
const { format } = require("date-fns");

exports.postNewVoting = async function(req, res, next) {
  try {
    const votingOptionFormat = req.body.votingOptions.map(option => ({ optionTitle: option }));
    // console.log(req.body, "body")

    const newVoting = await Voting.create({
      title: req.body.title,
      author: req.user._id,
      expireDate: req.body.expireDate,
      votingOptions: votingOptionFormat,
    });

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { votingsCreatedByMe: newVoting._id }}
    );

    req.flash("messages", { message: "Registered your voting successfully!"});
    res.redirect("/votings/new");
  } catch (error) {
    next(error);
  }
};

exports.getSelectedVoting = async function (req, res, next) {
  try {
    const { params, user } = req;

    const isLoggedIn = req.user ? true : false;
    const { title, author, votingOptions, expireDate, isProceeding, winner } = await Voting.findById(params.id).populate("author").lean();
    const isAuthor = isLoggedIn && String(author._id) === String(user._id);
    console.log(isAuthor)

    const votingOptionFormat = votingOptions.map(option => {
      const { _id, title, voters } = option;

      return {
        _id: _id,
        title: title,
        voters: voters,
      }
    });

    const votingDetailFormat = {
      title: title,
      author: author.userName,
      contact: author.email,
      expireDate: format(expireDate, "yyyy/MM/dd"),
      isProceeding: isProceeding,
      winner: winner
    };

    res.render("voting",
      { title: "Voting", votingDetailFormat, votingOptionFormat, isAuthor, isLoggedIn, messages: req.flash("messages")}
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async function (req, res, next) {
  try {
    const votingId = req.params.id;

    await Voting.findByIdAndDelete(votingId);
    res.json({ result: "ok" });

    // res.end();
  } catch(error) {
    next(error);
  }
};

exports.updateVoting = async function (req, res, next) {
  try {
    const { votingId, selectedOptionValue, selectedOptionId } = req.body;

    if (!req.user) {
      res.redirect("/login");
      return;
    }

    const votingOptions = await Voting.findById({ _id: votingId }).populate("votingOptions");

    await Voting.findOneAndUpdate(
      { _id: votingId },
      { $push: { 'votingOptions.$[option].voters': req.user._id }},
      { arrayFilters: [{"option._id": selectedOptionId }]}
    );
  } catch (error) {
    next(error);
  }
};
