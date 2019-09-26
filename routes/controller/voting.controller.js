const dateFormat = require('dateformat');
const Voting = require('../../models/Voting');

const checkIsVoted = (voting, userId) => {
  return voting.selections.some(selection =>
    selection.voter.includes(userId)
  );
};

exports.updateVotingStatus = async (req, res, next) => {
  try {
    await Voting.updateMany(
      { expired_at: { $lte: new Date().toISOString() } },
      { status: 'EXPIRED' }
    );

    next();
  } catch (error) {
    next(error);
  }
};

exports.getAllVotings = async (req, res, next) => {
  try {
    const votingList = await Voting.find().populate('creator', 'name');
    const user = {
      profileImgUrl: req.user.profile_img_url,
      name: req.user.name
    };
    const votings = votingList.map(voting => {
      const formattedVoting = voting.toObject();
      formattedVoting.fomattedExpirationDate = dateFormat(new Date(voting.expired_at), "yyyy-mm-dd h:MM:ss");

      return formattedVoting;
    });
    console.log(votings);

    res.render('main', { title: 'Voting Platform', votings, user });
  } catch (error) {
    next(error);
  }
};

exports.getMyVotings = async (req, res, next) => {
  try {
    const votingList = await Voting.find({ creator: req.user._id }).populate('creator', 'name');
    const user = {
      profileImgUrl: req.user.profile_img_url,
      name: req.user.name
    };

    const votings = votingList.map(voting => {
      const formattedVoting = voting.toObject();
      formattedVoting.fomattedExpirationDate = dateFormat(new Date(voting.expired_at), "yyyy-mm-dd h:MM:ss");

      return formattedVoting;
    });

    res.render('myVotings', { title: 'Voting Platform', votings, user });
  } catch (error) {
    next(error);
  }
};

exports.getOneVotingById = async (req, res, next) => {
  try {
    const voting = await Voting.findById(req.params.id);
    const winner = voting.selections.reduce((acc, el) => {
      if (acc.voter.length > el.voter.length) {
        return acc;
      }
      return el;
    });
    const isVoted = checkIsVoted(voting, req.user._id);
    const isCreator = voting.creator.toString() === req.user._id;

    res.render(
      'voting',
      {
        title: 'Voting Platform',
        voting,
        winner: winner._id,
        isVoted,
        isCreator
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.getNewVotingForm = async (req, res, next) => {
  const user = {
    profileImgUrl: req.user.profile_img_url,
    name: req.user.name
  };
  const nowDatetime = dateFormat(new Date(), "yyyy-mm-dd'T'hh:MM");
  console.log(nowDatetime)
  res.render('newVote', { title: 'Voting Platform', user, nowDatetime });
};

exports.createVoting = async (req, res, next) => {
  try {
    const newVote = req.body;
    newVote.selections = newVote.selections.map(selection => {
      return {
        name: selection,
        voter: []
      };
    });

    newVote.creator = req.user._id

    await new Voting(newVote).save();
    res.status(302).redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  try {
    const voting = await Voting.findById(req.params.id);
    const isCreator = voting.creator.toString() === req.user._id;
    if(!isCreator) {
      const error = new Error('not authenticated');
      error.status = 401;
      return next(error);
    }

    await Voting.findByIdAndDelete(req.params.id);
    res.json({ result: 'ok' });
  } catch (error) {
    next(error);
  }
};

exports.voteSelection = async (req, res, next) => {
  try {
    const voting = await Voting.findById(req.params.id);

    voting.selections.forEach(selection => {
      if (selection._id.toString() === req.body.selection) {
        selection.voter.push(req.user._id);
      }
    });

    await voting.save();

    res.status(302).redirect(`/votings/${req.params.id}`);
  } catch (error) {
    next(error);
  }
};
