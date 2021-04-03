/* eslint-disable no-undef */
window.myPathController = (function () {
  const getRootPath = function () {
    return window.location.origin;
  };

  const searchParam = function (key) {
    return new URLSearchParams(location.search).get(key);
  };

  return {
    getRootPath,
    searchParam,
  };
})();
