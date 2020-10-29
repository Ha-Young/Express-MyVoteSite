const deleteButton = document.querySelector('.delete-button');
const SUCCESS_MESSAGE_DELETE = '투표가 삭제 되었습니다';
const ERROR_MESSAGE_REQUEST_FAIL = '요청이 실패했습니다';

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
