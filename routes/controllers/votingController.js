const Voting = require('../../models/Voting');
const User = require('../../models/User');
const { formatDate, isValidId } = require('../../public/javascripts/helpers');

exports.getAll = async (req, res, next) => {
  const votings = await Voting.find().sort({ created_at: -1 });

  const newVotings = await Promise.all(votings.map(async (voting) => {
    if(!isValidId(voting.author)) return next();

    const user = await User.findOne({ _id: voting.author });
    const newVoting = JSON.parse(JSON.stringify(voting._doc));
    const formatted = formatDate(newVoting.expiration);

    Object.assign(newVoting, formatted);
    newVoting.author = user.name;

    return newVoting;
  }));

  res.render('index', {
    user: req.user,
    votings: newVotings,
    flashes: req.flash()
  });
};

exports.getMyVoting = async (req, res, next) => {
  if(!isValidId(req.user._id)) return next();
  const myVotings = await Voting.find({ author: req.user._id }).sort({created_at: -1});

  const newVotings = await Promise.all(myVotings.map(async (voting) => {
    if(!isValidId(voting.author)) return next();

    const newVoting = JSON.parse(JSON.stringify(voting._doc));
    const user = await User.findOne({ _id: voting.author });
    const formatted = formatDate(newVoting.expiration);

    Object.assign(newVoting, formatted);
    newVoting.author = user.name;

    return newVoting;
  }));

  res.render('votings', {
    user: req.user,
    votings: newVotings
  });
};

exports.vote = async (req, res, next) => {
  if (!isValidId(req.user._id) || !isValidId(req.body.option)) {
    return next();
  }

  await Voting.findOneAndUpdate({
    _id: req.params.id,
    'options': { '$elemMatch': { _id: req.body.option } }
  },
  {
    '$push': { 'options.$.selected_user': req.user._id }
  });

  res.status(200).redirect(`/votings/${req.params.id}`);
};

exports.deleteVoting = async (req, res, next) => {
  if(!isValidId(req.params.id)) return next();

  await Voting.deleteOne({ _id: req.params.id });

  res.status(200).redirect('/');
};

exports.newVotingForm = (req, res) => {
  res.render('newVoting', {
    user: req.user,
    flashes: null
  });
};

exports.validateNewVoting = (req, res, next) => {
  try {
    const formatted = formatDate(req.body.date);
    req.sanitizeBody('title');
    req.sanitizeBody('option');
    req.checkBody('title', 'title을 입력해주세요.').notEmpty();
    req.checkBody('date', 'date가 유효하지 않습니다.').isDate();
    req.checkBody('option', 'option을 2개 이상 입력해주세요.').isLength({ min: 2 });

    const errors = req.validationErrors();

    if (errors || !formatted.isOpen) {
      if(errors) req.flash('error', errors.map(err => err.msg));

      if(!formatted.isOpen) req.flash('date', '만료날짜가 현재날짜보다 이전입니다.');

      res.render('newVoting', { flashes: req.flash(), user: req.user });
      return;
    }
  } catch(err) {
    next(err);
  }

  next();
};

exports.saveNewVoting = async (req, res) => {
  const filterOptions = req.body.option.filter(el => el)
    .map(text => {
      return ({
        selected_user: [],
        text
      });
    });

  try {
    await (new Voting({
      title: req.body.title,
      author: req.user._id,
      expiration: req.body.date,
      options: filterOptions
    })).save();

    res.status(200).redirect('/votings/success');
  } catch {
    res.status(500).redirect('/votings/error');
  }
};

exports.getVoting = async (req, res, next) => {
  if (!isValidId(req.params.id) || !isValidId(req.user._id)) return next();

  const voting = await Voting.findOne({ _id: req.params.id });
  const newVoting = JSON.parse(JSON.stringify(voting._doc));
  const votedIndex = voting.options.findIndex(option => (
    option.selected_user.includes(req.user._id)
  ));
  const totalVotes = voting.options.reduce((prev, curr) => {
    return prev + curr.selected_user.length;
  }, 0);
  const user = await User.findOne({ _id: newVoting.author });
  const formatted = formatDate(newVoting.expiration);

  Object.assign(newVoting, formatted);

  newVoting.author = user.name;
  newVoting.isAuthor = String(voting.author) === String(req.user._id);

  res.render('voting', {
    user: req.user,
    flashes: null,
    voting: newVoting,
    isVoted: votedIndex >= 0,
    votedIndex,
    totalVotes,
  });
};

exports.RenderSuccess = (req, res) => {
  res.render('success', { user: req.user });
};

exports.RenderError = (req, res) => {
  res.render('error', { user: req.user });
};
