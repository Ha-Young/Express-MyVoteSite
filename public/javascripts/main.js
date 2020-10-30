const $navigateInprogress = document.querySelector('#navigate-inprogress');
const $navigateExpired = document.querySelector('#navigate-expired');
const $myVoting = document.querySelector('#my-voting');
const path = window.location.pathname;

if (path === '/') {
  $navigateInprogress.style.cssText = 'color: white; font-weight: bold; background: rgba(61, 59, 60, 0.5);';
} else if (path === '/expired') {
  $navigateExpired.style.cssText = 'color: white; font-weight: bold; background: rgba(61, 59, 60, 0.5);';
} else if (path === '/my-votings') {
  $myVoting.style.cssText = 'color: white; font-weight: bold; background: rgba(61, 59, 60, 0.5);';
}
