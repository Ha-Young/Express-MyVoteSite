const {
  getOnlyNumbersFromString,
  getOnlyCharsFromString,
  getMilisecondByUnit,
} = require("../utils/calculateMilisecond");

const ACCESS_TOKEN_EXPIRATION_TIME = "15m";
const REFRESH_TOKEN_EXPIRATION_TIME = "14d";

module.exports.ACCESS_TOKEN_EXPIRATION_TIME = ACCESS_TOKEN_EXPIRATION_TIME;
module.exports.REFRESH_TOKEN_EXPIRATION_TIME = REFRESH_TOKEN_EXPIRATION_TIME;

module.exports.ACCESS_TOKEN_EXPIRATION_TIME_MILISECOND =
  getOnlyNumbersFromString(ACCESS_TOKEN_EXPIRATION_TIME)
  * getMilisecondByUnit(
      getOnlyCharsFromString(ACCESS_TOKEN_EXPIRATION_TIME)
    );

module.exports.REFRESH_TOKEN_EXPIRATION_TIME_MILISECOND =
  getOnlyNumbersFromString(REFRESH_TOKEN_EXPIRATION_TIME)
  * getMilisecondByUnit(
      getOnlyCharsFromString(REFRESH_TOKEN_EXPIRATION_TIME)
    );

module.exports.ACCESS_TOKEN = "accessToken";
module.exports.REFRESH_TOKEN = "refreshToken";
