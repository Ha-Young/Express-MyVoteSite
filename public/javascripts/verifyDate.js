const pollDate = document.getElementById('date');

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;

let day = today.getDate();

if (day.length < 2) {
  day = '0' + day;
}

const currentDate = `${year}-${month}-${day}`;

pollDate.min = currentDate;
pollDate.value = currentDate;
