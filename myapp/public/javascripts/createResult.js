const $countTime = document.querySelector(".countTime");
const TIME_INTERVAL = 1000;
let countTime = 5;

$countTime.textContent = countTime;

const timer = setInterval(() => {
  countTime--;
  $countTime.textContent = countTime;

  if (countTime == 0) {
    clearInterval(timer);
    window.location.href = "/";
  }
}, TIME_INTERVAL);
