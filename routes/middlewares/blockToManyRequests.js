const rateLimit = require("express-rate-limit");

exports.blockManyPasswordFailure = rateLimit({
  max: 5,
  message:
    "You've entered the wrong information too many times, please try in a minute"
});

exports.blockTooManyRequests = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 50,
  message:
    "Too many requests, please try in five minutes"
});