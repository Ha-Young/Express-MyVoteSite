import createError from 'http-errors';
import User from '../../models/User';
import Voting from '../../models/Voting';

export const renderHome = async (req, res, next) => {
  try {
    const votings = await Voting.find();
    res.render('home', { votings });
  } catch (e) {
    next(createError(500));
  }
};

export const renderMyVotings = async (req, res, next) => {
  try {
    const { my_voting_list: votings } = await User.findById(req.user._id).populate({
      path: 'my_voting_list'
    });

    res.render('my_votings', { title: 'My Votings', votings });
  } catch (e) {
    next(createError(500));
  }
};
