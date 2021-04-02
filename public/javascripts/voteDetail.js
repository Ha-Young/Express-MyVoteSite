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

$voteButton.addEventListener("click" , () => {
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
    },
  }).then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result === "none") {
        window.location.href = "/signin";
      } else {
        window.location.href = `/votings/${voteId}`;
      }
    })
    .catch(() => {
      window.location.href = "/signin";
    });
});

$deleteButton && $deleteButton.addEventListener("click", () => {
  const voteId = $deleteButton.getAttribute("voteId");

  fetch(`/votings/${voteId}`, {
    method: "DELETE",
  }).then(() => {
    window.location.href = "/";
  }).catch(() => {
    alert("에러가 발생했습니다! 다시 시도해 주세요!");
    window.location.href = "/";
  });
});

$resultToggleButton && $resultToggleButton.addEventListener("click", () => {
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
