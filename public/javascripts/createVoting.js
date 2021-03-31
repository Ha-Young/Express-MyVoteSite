const options = document.querySelector(".options");
const optionAddButton = document.querySelector(".option-add-button");
const form = document.querySelector(".create-voting-form");
const messageBox = document.querySelector(".message-box");

const optionTemplate =
  `<li>
    <input
      class="input-options"
      type="text"
      name="option"
      required
    />
    <button
      class="option-remove-button"
      type="button"
    >
      ×
    </button>
  </li>`;



const handleOptionAddButtonClick = (e) => {
  options.insertAdjacentHTML(
    "beforeend",
    optionTemplate
  );
};

const setMessage = (message) => {
  messageBox.textContent = message;
}

const handleOptionRemoveButtonClick = (e) => {
  const isClickedExactly = e.target.className === "option-remove-button";
  const isMoreThanTwo = options.childNodes.length > 2;

  if (isClickedExactly && isMoreThanTwo) {
    e.target.parentNode.remove();
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const voting = {
    title: e.target.title.value,
    description: e.target.description.value,
    options:
      Array.from(e.target.elements.option).map((node) => node.value),
    expirationTime: e.target.expirationTime.value,
    isAbleSelectMultipleOptions:
      e.target.isAbleSelectMultipleOptions.checked,
  };

  try {
    const response = await fetch("/votings/new", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(voting),
    });

    const createVotingResult = await response.json();

    if (createVotingResult.result) {
      window.location.href = "/";
    } else {
      setMessage(createVotingResult.message);
    }
  } catch (err) {
    setMessage("error!");
  }
};

optionAddButton.addEventListener("click", handleOptionAddButtonClick);
options.addEventListener("click", handleOptionRemoveButtonClick);
form.addEventListener("submit", handleSubmit);
