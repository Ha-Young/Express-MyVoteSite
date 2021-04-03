/* eslint-disable no-undef */
window.setInfiniteScroll = (function () {
  function throttleOnRendering(cb) {
    if (!cb) {
      throw Error("Invalid required arguments");
    }

    let tick = false;

    return function () {
      if (tick) {
        return;
      }

      tick = true;
      return window.requestAnimationFrame(() => {
        tick = false;
        return cb();
      });
    };
  }

  function infiniteScroll(fetchCallback) {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        fetchCallback();
      }
    };

    const handleScrollThrottle = throttleOnRendering(handleScroll);

    window.addEventListener("scroll", handleScrollThrottle);
  }

  return infiniteScroll;
})();
