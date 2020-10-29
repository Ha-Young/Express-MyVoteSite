const votingButton = document.querySelector('.votingButton');
const SUCCESS_MESSAGE_VOTING = '투표가 완료 되었습니다';
const ERROR_MESSAGE_FAIL_VOTING = '투표에 실패하였습니다';

votingButton.addEventListener('click', async () => {
  const { id } = event.target;
  const optionInput = document.getElementsByName('option');
  let data = { name: 'ajax' };
  let result;

  for (let i = 0; i < optionInput.length; i++) {
    if (optionInput[i].checked) {
      data.option = optionInput[i].value;
    }
  }

  try {
    const response = await fetch(`http://localhost:3000/votings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    result = await response.json();

    if (result.message === SUCCESS_MESSAGE_VOTING) {
      return location.assign('http://localhost:3000/votings/success');
    }
    if (result.message === ERROR_MESSAGE_FAIL_VOTING) {
      return location.assign('http://localhost:3000/login');
    }
  } catch (err) {
    console.error(err);
  }
});
