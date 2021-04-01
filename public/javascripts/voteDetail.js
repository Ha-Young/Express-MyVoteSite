const $choiceDivs = document.getElementsByClassName("voteDetail__choice");
const $voteButton = document.querySelector(".voteButton");

function toggleDivs(element) {
  const $choiceDivs = document.getElementsByClassName("voteDetail__choice");
  for (let $choiceDiv of $choiceDivs) {
    $choiceDiv.style.backgroundColor = "";
  }

  element.style.backgroundColor = "black";
  $voteButton.setAttribute("choiceId", element.getAttribute("choiceId"));
}

$voteButton.addEventListener("click" , async (event) => {
  console.log($voteButton.attributes.choiceId);
  console.log($voteButton.attributes.vote);
  const voteId = $voteButton.getAttribute("voteId");
  const chosenId = $voteButton.getAttribute("choiceId");
  await fetch(`/votings/${voteId}`, {
    method: "PUT",
    body: JSON.stringify({ chosenId }),
    headers: {
      "Content-Type": "application/json"
    }
  });
});

// TODO: (선택사항...) 남은시간을 표시해주는 것을 보여준다. (setInterval)

// TODO: 여기에 이것을 만든 사용자가 왔을 경우 몇가지 특별한 동작을 추가한다.
