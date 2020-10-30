const func = () => {
  const options = document.getElementsByName('option');
  let checkedOptionIndex = null;

  for (let index = 0; index < options.length; index++) {
    if (options[index].checked) {
      checkedOptionIndex = index;
      break;
    }
  }
  const votedId = window.location.href.split('votings/')[1];
  const URL = '/votings/vote';
  const data = {
    votedId,
    checkedOptionIndex,
  };

  fetch(URL, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },

  })
    .then((res) => res.json())
    .then((res) => {
      if (res.includes('/')) {
        window.location.href = res;
      } else {
        window.location.reload();
      }
    });
};

if (document.getElementById('button')) {
  document.getElementById('button').addEventListener('click', func);
}
