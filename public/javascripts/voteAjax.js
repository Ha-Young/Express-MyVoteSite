const $patchButton = document.getElementById('patch-button');
const $deleteButton = document.getElementById('delete-button');
const $form = document.getElementById('patch-form');

const xhr = new XMLHttpRequest();
const url = {
  patchUrl: 'http://localhost:8080/votings/' + $form.name,
  redirectUrl: 'http://localhost:8080',
};

const METHOD = {
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

function patchVote() {
  xhr.open(METHOD.PATCH, url.patchUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');

  for (let i = 0; i < $form.length; i++) {
    if ($form[i].checked) {
      xhr.send(JSON.stringify({
        selected: $form[i].value
      }));

      break;
    }
  }

  xhr.onload = () => {
    window.location.reload();
    return false;
  };
}

function deleteVote() {
  xhr.open(METHOD.DELETE, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();

  xhr.onload = () => {
    window.location.replace(url.redirectUrl);
  };
}

function init() {
  if ($patchButton) {
    $patchButton.addEventListener('click', patchVote);
  }

  if($deleteButton) {
    $deleteButton.addEventListener('click', deleteVote);
  }
}

init();
