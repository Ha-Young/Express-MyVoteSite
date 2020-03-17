const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Votings = require('../models/Votings');

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('newVoting', {
        title: '투표 생성하기',
        message: ''
    });
});

router.post('/new', async (req, res, next) => {
    const todayNow = new Date();
    const { title, description, expiration_date, expiration_time, selectOption } = req.body;
    const result_expiration_date = new Date(expiration_date + '.' + expiration_time);
    const select_option = selectOption.split(',');

    try {
        if (todayNow > result_expiration_date) {
            req.flash('dateError', '날짜를 확인하세요.')
            return res.render('newVoting', {
                title: '투표 생성하기',
                message: req.flash('dateError')
            });
        }
        await Votings.create({
            id: Date.now(),
            title,
            writer: req.user.name,
            writerId: req.user._id,
            description,
            expiration_date: result_expiration_date,
            select_option,
            progress: true
        });
        return res.redirect('/');

    } catch (err) {
        next(err);
    }
});

router.get('/:id', isLoggedIn, (req, res, next) => {
    const id = req.params.id;
    console.log('---------id-------', id);
    res.render('votingPage', {
        title: '투표 페이지'
    });
});


module.exports = router;
