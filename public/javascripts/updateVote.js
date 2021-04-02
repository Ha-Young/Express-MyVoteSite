const options = document.querySelector(".vote-options");

async function postVote(url, data) {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.json();
}

function getUserOption() {
  const selectedOptionName = document.querySelector("input[name='option']:checked").value;
  const votingId = options.id;
  const url = "http://localhost:3000/votings/" + votingId;

  postVote(url, { name: selectedOptionName })
    .then(data => {
      window.location.href = data;
    });
}

function init() {
  options.addEventListener("submit", getUserOption);
}

init();
