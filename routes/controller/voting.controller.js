const ObjectId = require('mongoose').Types.ObjectId;
const dateFormat = require('dateformat');
const Voting = require('../../models/Voting');

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
      formattedVoting.fomattedExpirationDate = dateFormat(new Date(voting.expired_at), 'yyyy-mm-dd h:MM:ss');

      return formattedVoting;
    });

    res.render('myVotings', { title: 'Voting Platform', votings, user });
  } catch (error) {
    next(error);
  }
};


exports.renderVotingForm = (req, res, next) => {
  const user = {
    profileImgUrl: req.user.profile_img_url,
    name: req.user.name
  };
  const nowDatetime = dateFormat(new Date(), "yyyy-mm-dd'T'hh:MM");

  res.render('newVote', { title: 'Voting Platform', user, nowDatetime });
};


exports.createVoting = async (req, res, next) => {
  try {
    const newVote = Object.assign({}, req.body);

    if (newVote.selections.length < 2) {
      throw new Error();
    }

    newVote.selections = newVote.selections.map(selection => {
      return {
        name: selection,
        voter: []
      };
    });
    newVote.creator = req.user._id

    await new Voting(newVote).save();
    res.redirect('/votings/success');
  } catch (error) {
    res.redirect('/votings/error');
  }
};

exports.renderCreateSuccess = (req, res, next) => {
  res.render('success', { title: 'Voting Platform' });
};

exports.renderCreateError = (req, res, next) => {
  const error = new Error('Bad Request');
  error.status = 400;
  next(error);
};

exports.checkHasVoted = async (req, res, next) => {
  try {
    const voting = await Voting.findById(req.params.id).populate('creator', 'name');

    res.locals.voting = voting;
    res.locals.hasVoted = voting.selections.some(selection =>
      selection.voter.includes(req.user._id)
    );

    next();
  } catch (error) {
    next(error);
  }
};

exports.getVotingById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return next();
    }
    const voting = res.locals.voting;
    let totalVoter = 0;
    voting.selections.forEach(selection => {
      totalVoter += selection.voter.length;
    });

    const winner = voting.selections.reduce((win, selection) => {
      if (win.voter.length >= selection.voter.length) {
        return win;
      }
      return selection;
    });

    const isMatchedCreator = voting.creator._id.toString() === req.user._id;
    const formattedVoting = voting.toObject();
    formattedVoting.fomattedExpiredDate = dateFormat(new Date(voting.expired_at), 'yy/mm/dd hh:mm');
    formattedVoting.fomattedCreatedDate = dateFormat(new Date(voting.createdAt), 'yy/mm/dd hh:mm');

    res.render(
      'voting',
      {
        title: 'Voting Platform',
        voting: formattedVoting,
        totalVoter,
        winner: winner._id,
        hasVoted: res.locals.hasVoted,
        isMatchedCreator
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.voteSelection = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return next();
    }
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

exports.deleteVoting = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return next();
    }
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
