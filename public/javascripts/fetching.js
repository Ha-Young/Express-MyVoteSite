const $options = document.querySelectorAll(".option-radio");
const $optionsList = Array.from($options);
const $votingInfo = document.querySelector(".voting-info");
const $votingSubmitBtn = document.querySelector(".voting-submit-btn");
const $deleteButton = document.querySelector(".voting-delete-btn");

if ($votingSubmitBtn) {
  $votingSubmitBtn.addEventListener("click", handleVotingSubmit);
}

if ($deleteButton) {
  $deleteButton.addEventListener("click", handleDeleteBtnClick);
}

async function handleVotingSubmit(e) {
  try {
    e.preventDefault();

    let selectedOptionValue = null;
    let selectedOptionId = null;

    for (let option of $optionsList) {
      if (option.checked) {
        selectedOptionValue = option.value;
        selectedOptionId = option.id;
        break;
      }
    }

    const originPath = window.location.origin;
    const votingPath = window.location.pathname;
    const totalPath = `${originPath}${votingPath}`;
    const votingId = votingPath.split("/").pop();

    if (!selectedOptionId || !selectedOptionValue) {
      const errorMessage = document.createElement("p");
      $votingInfo.appendChild(errorMessage);
      errorMessage.textContent = "please select at least one option";
      window.location.href = `${originPath}${votingPath}`;
    }

    const rawResponse = await fetch(
      totalPath,
      { method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votingId, selectedOptionValue, selectedOptionId }),
      }
    );

    const content = await rawResponse.json();

    if (content === "no user") {
      window.location.href = "/login"
      return;
    } else if (content === "user exist")  {
      window.location.href = totalPath;
    } else if (content === "already voted") {
      const errorMessage = document.createElement("p");
      $votingInfo.appendChild(errorMessage);
      errorMessage.textContent = "alraedy voted for this voting";
      window.location.href = totalPath;
    }
  } catch (error) {
    console.warn(error);
  }
}

async function handleDeleteBtnClick(e) {
  try {
    e.preventDefault();

    const originPath = window.location.origin;
    const votingPath = window.location.pathname;
    const totalPath = `${originPath}${votingPath}`;

    const rawResponse = await fetch(
      totalPath,
      { method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }
    );
    const content = await rawResponse.json();

    if (content.result === "ok") {
      window.location.href = "/";
    }
  } catch (error) {
    console.warn(error);
  }
}
