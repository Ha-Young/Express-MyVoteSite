import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local',
    { successRedirect: '/', failureRedirect: '/login' }
  )
);

router.get('/signup', (req, res) => {
  res.render('signup');
});

export default router;
