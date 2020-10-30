const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const DEFAULT_ADD_DATES = 2;
const MAX_DAYS = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

let currentDate = `${year}-${month}-${day}`;
let currentTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds}`;
timeElement.value = currentTime;
dateElement.value = currentDate;
dateElement.min = currentDate;

function calculateDefalultDate() {
  const defaltDay = day + DEFAULT_ADD_DATES;
  if (defaltDay > MAX_DAYS[month]) {
    month += 1;
    defaltDay -= MAX_DAYS(month);

    if (month > 12) {
      year += 1;
      month = 1;
    }
  }
  currentDate = `${year}-${month}-${defaltDay}`;
  currentTime = `${hours}:${minutes}:${seconds}`;
}

calculateDefalultDate();
