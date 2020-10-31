const rangeValueTo = document.getElementById('rangeValue');
const rangeInput = document.getElementById('expireTo');

rangeInput.addEventListener('change', (e) => {
  rangeValueTo.innerHTML = `몇 시간 후 투표를 종료할까요? <br/> ${e.target.value}시간 후 투표가 종료됩니다`;
});

const submitButton = document.getElementById('submit');

let hasSubmitted = false;

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();

  if (hasSubmitted) {
    return;
  }

  hasSubmitted = true;

  try {
    var formData = $('form').serialize();

    const result = await axios.post('/votings/new', formData);

    console.log(result);

    if (result.data.success) {
      alert('성공적으로 투표가 생성되었습니다!');

      window.location.href = '/';
    } else {
      alert('투표 생성 실패..');
    }
  } catch (err) {
    console.log(err);
  }
});
