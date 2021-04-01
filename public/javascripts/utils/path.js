/* eslint-disable no-undef */
window.myPathController = (function () {
  const getRootPath = function () {
    return `${window.location.hostname}:${window.location.port}`;
  };

  return {
    getRootPath,
  };
})();
