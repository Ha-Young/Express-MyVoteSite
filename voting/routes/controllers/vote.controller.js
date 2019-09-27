const Vote = require('../../models/Vote');
const User = require('../../models/User');
const formatRelative = require('date-fns/formatRelative');

function process(voteList) {
  return Promise.all(
    voteList.map(async vote => {
      const user = await User.findById(vote.creator._id);
      const exdate = new Date(vote.expiration_date);
      const now = new Date();
      const processedVote = JSON.parse(JSON.stringify(vote._doc));
      const formatDate = formatRelative(vote.expiration_date, new Date());
      processedVote.expiration_date = formatDate;
      processedVote.creatorName = user.name;
      processedVote.progress = Boolean(exdate - now > 0);
      return processedVote;
    })
  );
}

exports.getAll = async function(req, res, next) {
  try {
    const voteList = await Vote.find();
    const processedVoteList = await process(voteList);

    res.render('index', {
      user: req.user,
      voteList: processedVoteList
    });
  } catch (error) {
    next();
  }
};

exports.getVote = async function(req, res, next) {
  try {
    const vote = await Vote.findById(req.params.id);
    const [processedVote] = await process([vote]);
    let hasVoted = false;

    processedVote.options.forEach(option => {
      option.people.forEach(person => {
        if (person === String(req.user._id)) {
          hasVoted = true;
        }
      });
    });

    const maxLength = Math.max(
      ...processedVote.options.map(el => el.people.length)
    );
    const results = processedVote.options.filter(
      el => el.people.length === maxLength
    );
    res.render('voteRoom', {
      user: req.user,
      vote: processedVote,
      maxLength,
      results,
      hasVoted
    });
  } catch {
    next();
  }
};

exports.selectVote = async function(req, res, next) {
  try {
    const vote = await Vote.findById(req.params.id);
    const selectedOption = vote.options.find(option => {
      return String(option._id) === req.body.option;
    });

    selectedOption.people.push(req.user._id);
    await vote.save();

    res.redirect('/');
  } catch {
    next();
  }
};

exports.deleteVote = async function(req, res, next) {
  try {
    await Vote.findOneAndDelete({ _id: req.params.id });
    res.redirect('/');
  } catch {
    next();
  }
};

exports.getMyVote = async function(req, res, next) {
  try {
    const voteList = await Vote.find({ creator: req.user._id });
    const processedVoteList = await process(voteList);

    res.render('myVote', {
      user: req.user,
      voteList: processedVoteList
    });
  } catch {
    next();
  }
};

exports.createVote = async function(req, res, next) {
  try {
    const options = req.body.options.map(option => {
      return { title: option, people: [] };
    });
    const vote = new Vote({
      title: req.body.title,
      creator: req.user,
      expiration_date: req.body.expiration,
      options
    });
    await vote.save();
    res.redirect('/votings/success');
  } catch {
    res.redirect('/votings/error');
  }
};
