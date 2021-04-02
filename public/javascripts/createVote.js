import showModal, { showValidation } from "./util.js";

const addOptionButton = document.querySelector("#optionButton");
const optionList = document.querySelector(".option-list");
const clearAllOptionButton = document.querySelector("#clearAllOptionsButton");
const createVoteForm = document.querySelector("#create-vote");

addOptionButton.addEventListener("click", () => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const deleteButton = document.createElement("button");

  input.setAttribute("name", "option_title");
  input.setAttribute("type", "text");
  input.setAttribute("required", true);
  input.setAttribute("placeholder", "Option");

  deleteButton.textContent = "DELETE";
  deleteButton.setAttribute("type", "button");
  deleteButton.classList.add("button", "deleteButton", "red");

  if (optionList.childNodes.length > 7) {
    const validationText = document.querySelector(".validation");
    validationText.classList.remove("hidden");
    validationText.textContent = "옵션의 갯수는 최대 8개까지 가능합니다."
    return;
  }

  li.append(input, deleteButton);
  optionList.appendChild(li);

  removeOptions();
});

clearAllOptionButton.addEventListener("click", () => {
  optionList.innerHTML = "";
});

createVoteForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("input[name='title']").value;
  const expirationDate = document.querySelector("input[name='expiration_date']").value;
  const optionInputs = document.querySelectorAll("input[name='option_title']");
  const options = Array.prototype.slice.call(optionInputs).map(input => input.value);

  try {
    const response = await fetch("/votings/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        expiration_date: expirationDate,
        option_title: options
      })
    });
    const result = await response.json();

    if (result.error) {
      showValidation(result.error.msg);
    } else {
      showModal(result.result);
    }
  } catch (err) {
    console.error(err);
  }
});

function removeOptions() {
  const deleteButtons = document.querySelectorAll(".deleteButton");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (event) => {
      event.target.parentElement.remove();
    });
  }
}
