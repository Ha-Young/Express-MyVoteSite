const Voting = require("../models/Voting");
const User = require("../models/User");

exports.postNewVoting = async function(req, res, next) {
  try {
      // const { email, username, password } = req.body;
      // const hashedPassword = await bcrypt.hash(password, 10);

    console.log(req.body)
    console.log(req.user)

    const votingOptionFormat = req.body.votingOptions.map(option => ({ optionTitle: option }));

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
      // await User.create({
      //   email,
      //   userName: username,
      //   password: hashedPassword,
      // });
    res.redirect("/votings/new");
      // res.redirect("/");
    return;
  } catch (error) {
    next(error);
  }
};
