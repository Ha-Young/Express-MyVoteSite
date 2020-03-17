const express = require('express');
const router = express.Router();
const { isLoggedIn, votingCreate } = require('../middleware');
const Votings = require('../models/Votings');

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('newVoting', {
        title: '투표 생성하기'
    });
});

router.post('/new', async (req, res, next) => {
    const { title, description, expiration_date, expiration_time, selectOption } = req.body;
    const result_expiration_date = expiration_date + '.' +expiration_time;
    const select_option = selectOption.split(',');

    try {
        await Votings.create({
            id: Date.now(),
            title: title,
            writer: req.user.name,
            writerId: req.user._id,
            description: description,
            expiration_date: new Date(result_expiration_date),
            select_option: select_option,
            progress: true
        });
        return res.redirect('/');

    } catch(err) {
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
