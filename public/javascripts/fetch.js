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

const SUCCESS_MESSAGE_VOTING = '투표가 완료 되었습니다';
const ERROR_MESSAGE_REQUEST_FAIL = '요청이 실패했습니다';
const SUCCESS_MESSAGE_DELETE = '투표가 삭제 되었습니다';
const ERROR_MESSAGE_DELETE_FAIL = '삭제 실패했습니다';

const votingButton = document.querySelector('.votingButton');

if (votingButton) {
  votingButton.addEventListener('click', async () => {
    try {
      const { id } = event.target;
      const optionInput = document.getElementsByName('option');
      let data = {};

      for (let i = 1; i < optionInput.length; i++) {
        if (optionInput[i].checked) {
          data.option = optionInput[i].value;
        }
      }

      const response = await fetch(`http://localhost:3000/votings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      switch (result.message) {
        case SUCCESS_MESSAGE_VOTING:
          return location.assign(`http://localhost:3000/success/${result.message}`);
        case ERROR_MESSAGE_REQUEST_FAIL:
          return location.assign('http://localhost:3000/login');
        case ERROR_MESSAGE_DELETE_FAIL:
          return location.assign(`http://localhost:3000/error/${result.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  });
}

const deleteButton = document.querySelector('.delete-button');

if (deleteButton) {
  deleteButton.addEventListener('click', async event => {
    try {
      const { id } = event.target;
      const response = await fetch(`http://localhost:3000/votings/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      switch (result.message) {
        case SUCCESS_MESSAGE_DELETE:
          return location.assign(`http://localhost:3000/success/${result.message}`);
        case ERROR_MESSAGE_REQUEST_FAIL:
          return location.assign(`http://localhost:3000/error/${result.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  });
}
