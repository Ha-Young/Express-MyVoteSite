const Voting = require("../../models/Voting");

exports.getAllVotings = async (req, res, next) => {
  const { user } = req;
  try {
    const votings = await Voting.find().populate("proponent", "name");
    
    res.status(200).render("index", { votings, user });
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
      proponent: user.id,
      options: options.map((option) => {
        return { option };
      }),
    });
    
    await voting.save();

    res.status(302).redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.getVotingDetail = async (req, res, next) => {
  try {
    const { 
      params: { id },
      user,
    } = req;
    const voting = await Voting.findById(id);
    
    res.status(200).render("votingDetail", { voting, user }); //가공해서 주기..?
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const {
      params: { id },
      user,
    } = req;

    await Voting.deleteOne({ _id: id });
    
    res.status(200).json({ user: user.name });
  } catch (error) {
    next(error);
  }
};

exports.updateVoting = async (req, res, next) => {
  try {
    const {
      params: { id },
      user,
      body: { option },
    } = req;
    const voting = await Voting.findById(id);
    const isVoted = voting.voters.some((voter) => user.id === voter.toString());
    let isSuccessVoting = false;

    if (!isVoted) {
      const targetKey = voting.options.findIndex((content) => content.option === option);

      voting.voters.push(user.id);
      const votted = ++voting.options[targetKey].count;

      await voting.save(); 

      isSuccessVoting = true;

      res.status(200).json({ user: user.name, isSuccessVoting, votted });

      return;
    }

    res.status(200).json({ user: user.name, isSuccessVoting });
  } catch (error) {
    next(error);
  }
};

exports.getMyVotingPage = async (req, res, next) => {
  const { user: { _id } } = req;
  
  try {
    const votings = await Voting.find({ proponent: _id }).lean(); // populate로 수정..

    res.status(200).render("myVoting", { votings });
  } catch (error) {
    next(error);
  }
};

exports.getMyPage = (req, res, next) => {
  res.status(200).render("newVoting");
};
