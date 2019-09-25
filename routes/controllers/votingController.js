const Voting = require('../../models/Voting');
const User = require('../../models/User');
const moment = require('moment');

exports.getAll = async (req, res) => {
  try {
    const votings = await Voting.find();

    const newVotings = await Promise.all(votings.map(async (voting) => {
      const newVoting = {...voting._doc};
      const user = await User.findOne({ _id: voting.author });
      const currentDate = new Date();
      const expirationDate = new Date(newVoting.expiration);
      const isValid = currentDate.getTime() < expirationDate.getTime();
      const newDate = moment(newVoting.expiration).format('YYYY MMM ddd, ahh:mm');

      newVoting.isValid = isValid;
      newVoting.expiration = newDate;
      newVoting.author = user.name

      return newVoting;
    }));

    //console.log(newVotings);

    res.render('index', {
      user: req.user,
      votings: newVotings,
      flashes: req.flash()
    });
  } catch(e) {
    next(err);
  }
};

exports.getVoting = async (req, res) => {
  console.log('getVoting');
  const voting = await Voting.findOne({ _id: req.params.id });
  const newVoting = {...voting._doc};
  const user = await User.findOne({ _id: newVoting.author });
  const currentDate = new Date();
  const expirationDate = new Date(newVoting.expiration);
  const isValid = currentDate.getTime() < expirationDate.getTime();
  const newDate = moment(newVoting.expiration).format('YYYY MMM ddd, ahh:mm');
  const isMine = String(voting.author) === String(req.user._id);

  newVoting.expiration = newDate;
  newVoting.isValid = isValid;
  newVoting.author = user.name;
  newVoting.isMine = isMine;

  res.render('voting', {
    user: req.user,
    flashes: null,
    voting: newVoting,
  });
};

exports.vote = async (req, res) => {
  // 여기다가 추가만 하믄 된다 'ㅁ'/
  await Voting.update(
    {
      _id: req.params.id,
      'options': { '$elemMatch': { _id: req.body.option } }
    },
    { '$push': { 'options.$.selected_user': req.user._id } }
  );

  res.status(301).redirect(`/votings/${req.params.id}`);
};

exports.newVotingForm = (req, res, next) => {
  res.render('newVoting', {
    user: req.user,
    flashes: null
  });
};

exports.validateNewVoting = (req, res, next) => {
  const currentDate = new Date();
  const expirationDate = new Date(req.body.date);
  const isNext = currentDate.getTime() < expirationDate.getTime();

  req.checkBody('title', 'title is required').notEmpty();
  req.checkBody('date', 'Invalid date').isDate();
  req.checkBody('option', 'option is required').isLength({ min: 2 });

  const errors = req.validationErrors();

  if (errors || !isNext) {
    if(errors) req.flash('error', errors.map(err => err.msg));

    if(!isNext) req.flash('date', '만료 날짜가 현재보다 ...');

    res.render('newVoting', { flashes: req.flash(), user: req.user });

    return;
  }

  next();
};

exports.saveNewVoting = async (req, res, next) => {
  console.log('saveNewVoting');
  const options = req.body.option.filter(el => el).map(el => {
    return ({
      text: el,
      selected_user: []
    });
  });

  console.log('title', req.body.title);
  console.log('author', req.user._id);
  console.log('expiration', req.body.date);
  console.log('options', options);

  try{
    await (new Voting({
      title: req.body.title,
      author: req.user._id,
      expiration: req.body.date,
      options
    })).save();

    res.status(301).redirect('/');
  } catch(e) {
    next(e);
  }
};

exports.success = (req, res, next) => {
  
};

