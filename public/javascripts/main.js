const $navigateInprogress = document.querySelector('#navigate-inprogress');
const $navigateExpired = document.querySelector('#navigate-expired');
const $myVoting = document.querySelector('#my-voting');
const path = window.location.pathname;

const onfocusCssText = 'color: white; font-weight: bold; background: rgba(61, 59, 60, 0.5);';

if (path === '/') {
  $navigateInprogress.style.cssText = onfocusCssText;
} else if (path === '/expired') {
  $navigateExpired.style.cssText = onfocusCssText;
} else if (path === '/my-votings') {
  $myVoting.style.cssText = onfocusCssText;
}
