const rangeValueTo = document.getElementById('rangeValue');
const rangeInput = document.getElementById('expireTo');

rangeInput.addEventListener('change', (e) => {
  rangeValueTo.innerHTML = `몇 시간 후 투표를 종료할까요? <br/> ${e.target.value}시간 후 투표가 종료됩니다`;
});
