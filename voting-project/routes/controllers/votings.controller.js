const Vote = require("../../models/vote");

exports.myPage = async function(req, res, next) {
  var vote = await Vote.find({ host: req.user._id });
  for (var i = 0; i < vote.length; i++) {
    for (var j = 0; j < vote[i].options.length; j++) {
      for (var k = 0; k < vote[i].options.length - (j + 1); k++) {
        if (
          vote[i].options[j].people.length <
          vote[i].options[j + 1].people.length
        ) {
          var tmp = vote[i].options[j + 1];
          vote[i].options[j + 1] = vote[i].options[j];
          vote[i].options[j] = tmp;
        }
      }
    }
  }
  res.render("myPage", {
    name: req.user.name,
    vote: vote
  });
};

exports.getAll = async function(req, res, next) {
  var vote = await Vote.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "host",
        foreignField: "_id",
        as: "host"
      }
    },
    {
      $unwind: "$host"
    },
    {
      $project: {
        title: 1,
        expiration: 1,
        options: 1,
        host: "$host.name"
      }
    }
  ]);
  res.render("index", {
    name: req.user.name,
    vote: vote
  });
};

exports.createPage = async function(req, res, next) {
  res.render("createVote", {
    name: req.user.name
  });
};
exports.getVote = async function(req, res, next) {
  var vote = await Vote.find({ _id: req.params.id });
  var fmsg = req.flash();
  var feedback = "";
  if (fmsg.error) {
    feedback = fmsg.error[0];
  }

  if (req.user._id === String(vote[0].host)) {
    res.render("voteDetailAdmin", {
      name: req.user.name,
      vote: vote,
      error: feedback
    });
  } else {
    res.render("voteDetail", {
      name: req.user.name,
      vote: vote,
      error: feedback
    });
  }
};

exports.updateVoting = async function(req, res, next) {
  var vote = await Vote.find({ _id: req.params.id });
  var alreadyVoted = false;
  var isCompleted = false;
  if (new Date() - vote[0].expiration > 1) {
    isCompleted = true;
  }
  for (var i = 0; i < vote[0].options.length; i++) {
    for (var j = 0; j < vote[0].options[i].people.length; j++) {
      if (String(vote[0].options[i].people[j]) === req.user._id) {
        alreadyVoted = true;
      }
    }
  }
  for (var i = 0; i < vote[0].options.length; i++) {
    if (vote[0].options[i].title === req.body.select) {
      if (!alreadyVoted && !isCompleted) {
        vote[0].options[i].people.push(req.user._id);
      }
    }
  }
  await vote[0].save();
  if (!alreadyVoted && !isCompleted) {
    return res.redirect("/");
  } else {
    if (alreadyVoted) {
      req.flash("error", "You already voted");
      if (req.user._id === String(vote[0].host)) {
        res.render("voteDetailAdmin", {
          name: req.user.name,
          vote: vote,
          error: req.flash("error")
        });
      } else {
        res.render("voteDetail", {
          name: req.user.name,
          vote: vote,
          error: req.flash("error")
        });
      }
    } else {
      req.flash("error", "is completed!!");
      if (req.user._id === String(vote[0].host)) {
        res.render("voteDetailAdmin", {
          name: req.user.name,
          vote: vote,
          error: req.flash("error")
        });
      } else {
        res.render("voteDetail", {
          name: req.user.name,
          vote: vote,
          error: req.flash("error")
        });
      }
    }
  }
};

exports.deleteVoting = async function(req, res, nex) {
  console.log(req.method);
  await Vote.findByIdAndDelete(req.params.id);
  return res.redirect("/");
};

exports.createPost = async function(req, res, next) {
  try {
    var title = req.body.title;
    var host = req.user._id;
    var expiration = req.body.expiration;
    var options = [];
    for (var i = 0; i < req.body.options.length; i++) {
      var options_obj = {};
      options_obj.title = req.body.options[i];
      options_obj.people = [];
      options.push(options_obj);
    }
    await Vote.create({
      title: title,
      host: host,
      expiration: expiration,
      options: options
    });
    res.render("success", {
      name: req.user.name
    });
  } catch (e) {
    res.render("success", {
      name: req.user.name
    });
  }
};
