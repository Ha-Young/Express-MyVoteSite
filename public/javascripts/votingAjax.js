const patchButton = document.getElementById('patch-button');
const deleteButton = document.getElementById('delete-button');
const form = document.getElementById('patch-form');

const xhr = new XMLHttpRequest();
const url = "http://localhost:8080/votings/" + form.name;

const METHOD = {
  PATCH: "PATCH",
  DELETE: "DELETE",
};

function patchVote() {
  xhr.open(METHOD.PATCH, url);
  xhr.setRequestHeader("Content-Type", "application/json");

  for (let i = 0; i < form.length; i++) {
    if (form[i].checked) {
      xhr.send(JSON.stringify({
        selected: form[i].value
      }));

      break;
    }
  }

  xhr.onload = () => {
    if (xhr.status !== 200) {
      console.log('Error.');
    }

    window.location.reload();
    return false;
  };
}

function deleteVote() {
  xhr.open(METHOD.DELETE, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  xhr.onload = () => {
    window.location.replace("http://localhost:8080");
    console.log(xhr.response);
  };
}

function init() {
  patchButton.addEventListener('click', patchVote);
  deleteButton.addEventListener('click', deleteVote);
}

init();
