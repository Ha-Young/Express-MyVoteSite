/* eslint-disable no-undef */
function authPageInit() {
  document.querySelector('.sign-img__btn').addEventListener('click', function () {
    document.querySelector('.sign-cont').classList.toggle('s--signup');
  });
}

authPageInit();
