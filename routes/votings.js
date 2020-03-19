const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Votings = require('../models/Votings');

router.get('/new', isLoggedIn, (req, res, next) => {
    res.render('newVoting', {
        title: '투표 생성하기',
        message: null
    });
});

router.post('/new', isLoggedIn, async (req, res, next) => {
    const todayNow = new Date();
    const { title, description, expiration_date, expiration_time, selectOption } = req.body;
    const result_expiration_date = new Date(expiration_date + '.' + expiration_time);
    const result_expiration_date_string = expiration_date + '.' + expiration_time
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
            expiration_date_string: result_expiration_date_string,
            select_option,
            progress: true
        });
        return res.redirect('/');

    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const votingId = req.params.id;
        const votingData = await Votings.findOne({ id: votingId });

        if (!votingData) {
            res.redirect('/');
        } else if (!req.user) {
            const selectOption = votingData.select_option;
            const voteCountList = votingData.vote_count;
            const votingResults = {}
            for(let i=0; i< selectOption.length; i++) {
                votingResults[selectOption[i]] = voteCountList.filter((el) => {
                    return el.selected_option === selectOption[i]
                }).length;
            }

            res.render('votingPage', {
                title: '투표 페이지',
                votingData,
                deleteBtn: null,
                result: null
            });
        } else {
            const selectOption = votingData.select_option;
            const voteCountList = votingData.vote_count;
            const votingResults = {}
            for(let i=0; i< selectOption.length; i++) {
                votingResults[selectOption[i]] = voteCountList.filter((el) => {
                    return el.selected_option === selectOption[i]
                }).length;
            }


            const deleteBtn = String(req.user._id) === String(votingData.writerId) ? '삭제' : null;
            const result =  String(req.user._id) === String(votingData.writerId) ? votingResults : null;
            res.render('votingPage', {
                title: '투표 페이지',
                votingData,
                deleteBtn,
                result
            });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.put('/:id', (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({ result: false });
        } else {
            const userId = String(req.user._id);
            const result = { votor: userId, selected_option: req.body.value };
            Votings.findOne({ id: req.params.id }, (err, votingData) => {
                const voteCount = votingData.vote_count;
                const userCheck = voteCount.find((el) => {
                    return el.votor === userId;
                });
                if (userCheck) {
                    return res.json({ result: 'overlap' });
                } else {
                    votingData.vote_count.push(result);
                    votingData.save();
                    res.json({ result: true });
                }
            });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const votingId = Number(req.params.id);
        await Votings.remove({ id: votingId });
        res.redirect('/');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
