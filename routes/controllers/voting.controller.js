const Voting = require("../../models/Voting");
const User = require("../../models/User");

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
    const newVoting = await Voting.create({
      title,
      expired_at,
      proponent: user.id,
      options: options.map((option) => {
        return { option };
      }),
    });
		
    const updateUser = await User.findByIdAndUpdate(user._id, {
			$push: { voting: newVoting._id }
		});
		
		await updateUser.save();

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
			originalUrl,
      body: { option },
    } = req;

		if (!user) {
			res
				.cookie("redirect", `${originalUrl}`, { httpOnly: true })
				.json({ user });
		}
		
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
    const [user] = await User.find({ _id }).populate("voting");
		
    res.status(200).render("myVoting", { votings: user.voting });
  } catch (error) {
    next(error);
  }
};

exports.getVotingPage = (req, res, next) => {
  const [error] = req.flash("newVotingError");

  res.status(200).render("newVoting", { message: error });
};
