const addOptionButton = document.querySelector('.add-option-button');

if (addOptionButton) {
  addOptionButton.addEventListener('click', event => {
    event.preventDefault();

    const newInput = document.createElement('input');
    const existInput = document.getElementsByName('options')[0];

    newInput.setAttribute('name', 'options');
    newInput.setAttribute('required', 'true');

    existInput.parentNode.insertBefore(newInput, existInput);
  });
}

const formResetbutton = document.querySelector('.form-reset-button');

if (formResetbutton) {
  formResetbutton.addEventListener('click', () => {
    const existInput = document.getElementsByName('options');

    if (2 < existInput.length) {
      for (let i = 0; i < existInput.length; i++) {
        existInput[i].remove();
      }
    }
  });
}

const votingButton = document.querySelector('.votingButton');
const SUCCESS_MESSAGE_VOTING = '투표가 완료 되었습니다';
const ERROR_MESSAGE_REQUEST_FAIL = '요청이 실패했습니다';
const SUCCESS_MESSAGE_DELETE = '투표가 삭제 되었습니다';

if (votingButton) {
  votingButton.addEventListener('click', async () => {
    const { id } = event.target;
    const optionInput = document.getElementsByName('option');
    let data = {};
    let result;

    for (let i = 1; i < optionInput.length; i++) {
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
        return location.assign(`http://localhost:3000/success/${result.message}`);
      }
      if (result.message === ERROR_MESSAGE_REQUEST_FAIL) {
        return location.assign('http://localhost:3000/login');
      }
    } catch (err) {
      console.error(err);
    }
  });
}

const deleteButton = document.querySelector('.delete-button');

if (deleteButton) {
  deleteButton.addEventListener('click', async event => {
    const { id } = event.target;
    let result;

    try {
      const response = await fetch(`http://localhost:3000/votings/${id}`, {
        method: 'DELETE',
      });
      result = await response.json();

      if (result.message === SUCCESS_MESSAGE_DELETE) {
        return location.assign(`http://localhost:3000/success/${result.message}`);
      }
      if (result.message === ERROR_MESSAGE_REQUEST_FAIL) {
        return location.assign(`http://localhost:3000/error/${result.message}`);
      }
    } catch (err) {
      console.error(err);
      return location.assign(`http://localhost:3000/error/${err.message}`);
    }
  });
}
