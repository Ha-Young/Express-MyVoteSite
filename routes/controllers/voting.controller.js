const Voting = require("../../models/Voting");
const User = require("../../models/User");

const { ErrorHandler } = require("../../util/error");
const { SERVER_ERROR, CLIENT_ERROR } = require("../../constants/error");

exports.getAllVotings = async (req, res, next) => {
  const { user } = req;

  try {
    const votings = await Voting.find()
      .sort({ expired_at: -1 })
      .populate("proponent", "name");

    res.status(200).render("index", { votings, user });
  } catch (error) {
    next(error);
  }
};

exports.createNewVoting = async (req, res, next) => {
  const { body: { options, expired_at, title }, user } = req;

  try {
    if (!user) {
      throw new ErrorHandler(401, SERVER_ERROR.UNAUTHORIZED);
    }

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

    res.status(200).render("votingDetail", { voting, user });
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

    let isSuccessVoting = false;
    
    if (!user) {
      res.status(200).json({ isSuccessVoting, queryString: originalUrl, message: "로그인이 필요합니다." });

      return;
    }

    const voting = await Voting.findById(id);
    const isVoted = voting.voters.some((voter) => user.id === voter.toString());

    if (isVoted) {
      res.status(200).json({ isSuccessVoting, message: "이미 투표하셨습니다." });
      
      return;
    }

    const targetKey = voting.options.findIndex((content) => content.option === option);
    const votingCount = ++voting.options[targetKey].count;

    voting.voters.push(user.id);

    await voting.save(); 

    res.status(200).json({ isSuccessVoting, result: votingCount, message: "투표가 완료되었습니다." });
  } catch (error) {
    next(error);
  }
};

exports.getMyVotingPage = async (req, res, next) => {
  const { user } = req;
  
  try {
    if (!user) {
      throw new ErrorHandler(401, SERVER_ERROR.UNAUTHORIZED);
    }

    const [userData] = await User.find({ _id: user._id }).populate("voting");
    
    res.status(200).render("myVoting", { votings: userData.voting });
  } catch (error) {
    next(error);
  }
};

exports.getNewVotingPage = (req, res, next) => {
  const { user } = req;

  try {
    if (!user) {
      throw new ErrorHandler(401, SERVER_ERROR.UNAUTHORIZED);
    }

    const [error] = req.flash(CLIENT_ERROR.NEW_VOTING_ERROR);

    res.status(200).render("newVoting", { message: error });
  } catch (error) {
    next(error);
  }
};
