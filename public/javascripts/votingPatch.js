const patchButton = document.getElementById('patch-button');
const form = document.getElementById('patch-form');

const xhr = new XMLHttpRequest();

function patchVote() {
  const url = "http://localhost:8080/votings/" + form.name;

  xhr.open("PATCH", url);
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
    console.log(xhr.response);
  };

}

function addEvent() {
  patchButton.addEventListener('click', patchVote);
}

addEvent();
