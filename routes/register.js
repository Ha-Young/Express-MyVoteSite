const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEYID,
  region: 'ap-northeast-2'
});

const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nkhvc',
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, '시간이없어서다음에할께요.jpg');
    }
  })
}).single('file');

router.post('/', upload, async (req, res, next) => {
  try {
    let img = null;
    const checkDupName = await User.find({ name: req.body.name });
    if (!req.file) {
      img =
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    } else {
      req.file.location = img;
    }
    if (checkDupName.length) {
      req.flash('error', 'name이 중복됩니다. 다른 name을 사용하세요');
      return res.redirect('/signup');
    }
    if (req.body.password !== req.body.password2) {
      req.flash('error', '패스워드가 다릅니다');
      return res.redirect('/signup');
    }
    const hash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));
    await User.create({
      github_id: shortid.generate(),
      name: req.body.name,
      password: hash,
      profile_image: img
    });
    return res.redirect('/login');
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
});

router.get('/', async (req, res) => {
  res.render('signup');
});

module.exports = router;
