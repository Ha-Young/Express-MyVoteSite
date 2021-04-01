/* eslint-disable no-undef */
const JWT_COOKIE_KEY = "VCwpAthtk";
const LOGIN_ALLROW_DAY = 1;

const COOKIE_UTIL = window.myCookieController;

window.myLoginController = (function () {
  const checkLogin = () => {
    console.log('checkLogin');
    return COOKIE_UTIL.getCookie(JWT_COOKIE_KEY) ? true : false;
  };

  const doLogin = token => {
    COOKIE_UTIL.setCookie(JWT_COOKIE_KEY, token, LOGIN_ALLROW_DAY);
  };

  return {
    checkLogin,
    doLogin,
  };
})();
