/* eslint-disable no-undef */
window.myPathController = (function () {
  const getRootPath = function () {
    return window.location.origin;
  };

  return {
    getRootPath,
  };
})();
