const Voting = require("../models/Voting");

exports.postNewVoting = async function(req, res, next) {
    try {

      const { email, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        email,
        userName: username,
        password: hashedPassword,
      });
  
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };
  