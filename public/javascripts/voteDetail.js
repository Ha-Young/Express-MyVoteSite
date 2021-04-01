const $choiceDivs = document.getElementsByClassName("voteDetail__choice");
const $voteButton = document.querySelector(".voteButton");
const $deleteButton = document.getElementById("deleteButton");

function toggleDivs(element) {
  const $choiceDivs = document.getElementsByClassName("voteDetail__choice");
  for (let $choiceDiv of $choiceDivs) {
    $choiceDiv.style.backgroundColor = "";
  }

  element.style.backgroundColor = "rgba(255, 255, 255, .5)";
  $voteButton.setAttribute("choiceId", element.getAttribute("choiceId"));
}

$voteButton.addEventListener("click" , (event) => {
  const voteId = $voteButton.getAttribute("voteId");
  const chosenId = $voteButton.getAttribute("choiceId");
  fetch(`/votings/${voteId}`, {
    method: "PUT",
    body: JSON.stringify({ chosenId }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => {
    window.location.href = `/votings/${voteId}`;
  }).catch(err => {
    console.error(err);
    window.location.href = `/votings/${voteId}`;
  });
});

$deleteButton && $deleteButton.addEventListener("click", (event) => {
  const voteId = $deleteButton.getAttribute("voteId");
  fetch(`/votings/${voteId}`, {
    method: "DELETE"
  }).then((result) => {
    window.location.href = "/";
  }).catch(err => {
    console.error(err);
    window.location.href = "/";
  });
});

// TODO: 여기에 이것을 만든 사용자가 왔을 경우 몇가지 특별한 동작을 추가한다.
// TODO: (선택사항...) 남은시간을 표시해주는 것을 보여준다. (setInterval)
