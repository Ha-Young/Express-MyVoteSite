/* eslint-disable no-undef */
window.myCookieController = (function () {
  const setCookie = function (name, value, day = 1) {
    const date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  };

  const getCookie = function (cookieName) {
    console.log('getCookie', cookieName);
    if (document.cookie) {
      const array = document.cookie.split((escape(cookieName)+'='));
      if (array.length >= 2){
        const arraySub = array[1].split(';');
        console.log('find', unescape(arraySub[0]));
        return unescape(arraySub[0]);
      }
    }
    console.log('not find');
    return null;
  };

  const deleteCookie = function (name) {
    const date = new Date();
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
  };

  return {
    setCookie,
    getCookie,
    deleteCookie,
  };
})();
