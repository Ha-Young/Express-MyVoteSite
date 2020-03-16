const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'userEmail',
        passwordField: 'userPassword'
    }, async (userEmail, userPassword, done) => {
        try {
            const user = await User.findOne({ email_id: userEmail });
            if (user) {
                const result = await bcrypt.compare(userPassword, user.password);
                if (result) {
                    done(null, user);
                } else {
                    done(null, false, {
                        message: 'email id 또는 비밀번호가 일치하지 않습니다.'
                    });
                }
            } else {
                done(null, false, {
                    message: '가입되지 않은 회원입니다.'
                });
            }
        } catch (err) {
            console.log(err);
            done(err);
        }
    }));
}
