const $contentDivs = document.querySelector(".voteDetail__voteContent");
const $choiceDivs = document.getElementsByClassName("voteDetail__choice");
const $voteButton = document.querySelector(".voteButton");
const $deleteButton = document.getElementById("deleteButton");
const $resultToggleButton = document.getElementById("resultToggle");
const $chartDiv = document.getElementById("chartDiv");

if ($chartDiv.getAttribute("isEnable") === "false") {
  for (const $choiceDiv of $choiceDivs) {
    $choiceDiv.style.visibility = "hidden";
  }

  $contentDivs.style.height = "350px";
  $chartDiv.style.display = "flex";
}

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

  if (!chosenId) {
    return alert("선택지를 선택해주세요!");
  }

  fetch(`/votings/${voteId}`, {
    method: "PUT",
    body: JSON.stringify({ chosenId }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result === "none") {
        document.cookie =`redirectURL=/votings/${voteId}`;
        document.cookie =`test=adsf`;
        window.location.href = "/signin";
      } else {
        window.location.href = `/votings/${voteId}`;
      }
    })
    .catch(err => {
      console.error(err);
      window.location.href = `/signin`;
    });
});

$deleteButton && $deleteButton.addEventListener("click", (event) => {
  const voteId = $deleteButton.getAttribute("voteId");

  fetch(`/votings/${voteId}`, {
    method: "DELETE"
  }).then(() => {
    window.location.href = "/";
  }).catch(err => {
    console.error(err);
    window.location.href = "/";
  });
});

$resultToggleButton && $resultToggleButton.addEventListener("click", (event) => {


  if ($chartDiv.style.display === "none" || !$chartDiv.style.display) {
    for (const $choiceDiv of $choiceDivs) {
      $choiceDiv.style.visibility = "hidden";
    }

    $contentDivs.style.height = "350px";
    $chartDiv.style.display = "flex";
  } else {
    for (const $choiceDiv of $choiceDivs) {
      $choiceDiv.style.visibility = "visible";
    }

    $contentDivs.style.height = "";
    $chartDiv.style.display = "none";
  }
});


// TODO: 여기에 이것을 만든 사용자가 왔을 경우 몇가지 특별한 동작을 추가한다.
// TODO: (선택사항...) 남은시간을 표시해주는 것을 보여준다. (setInterval)
