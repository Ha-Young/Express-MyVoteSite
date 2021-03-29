/* eslint-disable no-undef */
function authPageInit() {
  document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
  });
}

authPageInit();
