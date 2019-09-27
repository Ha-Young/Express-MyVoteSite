const ObjectId = require('mongoose').Types.ObjectId;
const dateFormat = require('dateformat');
const Voting = require('../../models/Voting');
const { votingStatus } = require('../../models/constants/constants');

exports.updateVotingStatus = async (req, res, next) => {
  try {
    await Voting.updateMany(
      {
        expired_at: { $lte: new Date().toISOString() }
      },
      { status: votingStatus.EXPIRED },
      { runValidators: true }
    );
    next();
  } catch (error) {
    next(error);
  }
};

exports.getAllVotings = async (req, res, next) => {
  try {
    const votingList = await Voting.find().populate('created_by', 'name');
    const user = {
      profileImgUrl: req.user.profile_img_url,
      name: req.user.name
    };
    const votings = votingList.map(voting => {
      const formattedVoting = voting.toObject();
      formattedVoting.fomattedExpirationDate = dateFormat(new Date(voting.expired_at), 'yyyy-mm-dd h:MM');

      return formattedVoting;
    });

    res.render('main', { title: 'Voting Platform', votings, user });
  } catch (error) {
    next(error);
  }
};

exports.getMyVotings = async (req, res, next) => {
  try {
    const votingList = await Voting.find({ created_by: req.user._id }).populate('created_by', 'name');
    const user = {
      profileImgUrl: req.user.profile_img_url,
      name: req.user.name
    };

    const votings = votingList.map(voting => {
      const formattedVoting = voting.toObject();
      formattedVoting.fomattedExpirationDate = dateFormat(new Date(voting.expired_at), 'yyyy-mm-dd h:MM:');

      return formattedVoting;
    });

    res.render('myVotings', { title: 'My Votings', votings, user });
  } catch (error) {
    next(error);
  }
};


exports.renderVotingForm = (req, res) => {
  const user = {
    profileImgUrl: req.user.profile_img_url,
    name: req.user.name
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nowDatetime = dateFormat(tomorrow, "yyyy-mm-dd'T'HH:MM");

  res.render('newVote', { title: 'New Voting Form', user, nowDatetime });
};

exports.validateSelections = (req, res, next) => {
  const newVote = Object.assign({}, req.body);
  const trimmedSelections =
    req.body.selections.map(selection => {
      return {
        name: selection.trim(),
        voter: []
      };
    }).filter(el => el.name);

  newVote.selections = trimmedSelections;
  res.locals.newVote = newVote;

  if (newVote.selections.length < 2) {
    return res.redirect('/votings/error');
  }
  next();
};

exports.createVoting = async (req, res) => {
  try {
    res.locals.newVote.created_by = req.user._id;
    const newVote =  new Voting(res.locals.newVote);
    await newVote.validate();
    await newVote.save();
    res.redirect('/votings/success');
  } catch (error) {
    res.redirect('/votings/error');
  }
};

exports.renderCreateSuccess = (req, res) => {
  res.render('success', { title: 'Create Success' });
};

exports.renderCreateError = (req, res, next) => {
  const error = new Error('Bad Request');
  error.status = 400;
  next(error);
};

exports.checkHasVoted = async (req, res, next) => {
  try {
    const voting = await Voting.findById(req.params.id).populate('created_by', 'name');

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

    let winner;
    if (totalVoter) {
      winner = voting.selections.reduce((win, selection) => {
        if (win.voter.length >= selection.voter.length) {
          return win;
        }
        return selection;
      });
    }
    const isCreator = voting.created_by._id.toString() === req.user._id.toString();
    const formattedVoting = voting.toObject();
    formattedVoting.fomattedExpiredDate = dateFormat(new Date(voting.expired_at), 'yy/mm/dd hh:mm');
    formattedVoting.fomattedCreatedDate = dateFormat(new Date(voting.createdAt), 'yy/mm/dd hh:mm');
    res.render(
      'voting',
      {
        title: formattedVoting.title,
        voting: formattedVoting,
        totalVoter,
        winner,
        hasVoted: res.locals.hasVoted,
        isCreator
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
    if (!isCreator) {
      const error = new Error('Not Authenticated');
      error.status = 401;
      return next(error);
    }

    await Voting.findByIdAndDelete(req.params.id);
    res.json({ result: 'ok' });
  } catch (error) {
    next(error);
  }
};
