const Voting = require("../../models/Voting");

exports.getAllVotings = async (req, res, next) => {
  const { user } = req;
  try {
    const votings = await Voting.find().lean();

    res.status(200).render("index", { votings });
  } catch (error) {
    next(error);
  }
};

exports.postNewVoting = async (req, res, next) => {
  const { body: { options, expired_at, title }, user } = req;

  try {
    const voting = Voting({
      title,
      expired_at,
      proponent: user._id,
      options: options.map((option) => {
        return { option };
      }),
    });
    console.log(voting);
    await voting.save();

    res.status(302).redirect("/");
  } catch (error) {
    next(error);
  }
};
